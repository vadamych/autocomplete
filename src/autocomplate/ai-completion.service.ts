import { Injectable } from '@nestjs/common';
import { makeRequest } from '../utils/ai-request';
import { LoggerServiceImplementation } from '../logger/logger.service';
import * as dotenv from 'dotenv';

dotenv.config();

export interface AIProvider {
  generateCode(prefix: string, suffix: string): Promise<string>;
}

@Injectable()
export class OpenAIProvider implements AIProvider {
  private apiKey: string;

  constructor(private readonly logger: LoggerServiceImplementation) {
    this.apiKey = process.env.OPENAI_API_KEY || '';
    if (!this.apiKey) {
      this.logger.error('OPENAI_API_KEY is not defined');
      throw new Error('OPENAI_API_KEY is not defined');
    }
    this.logger.log('OpenAIProvider initialized');
  }

  async generateCode(prefix: string, suffix: string): Promise<string> {
    this.logger.log(`Generating code for: ${prefix} ... ${suffix}`);
    const url = `${process.env.OPENAI_API_URL}/v1/chat/completions`;
    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `${prefix} ... ${suffix}` },
      ],
      max_tokens: 100,
      temperature: 0.7,
    };
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
    const response = await makeRequest(url, data, headers);
    return response.choices[0].text.trim();
  }
}

@Injectable()
export class OllamaProvider implements AIProvider {
  private model: string;

  constructor(private readonly logger: LoggerServiceImplementation) {
    this.model = process.env.AI_PROVIDER || 'codellama';
    this.logger.log(`OllamaProvider initialized with model: ${this.model}`);
  }

  async generateCode(prefix: string, suffix: string): Promise<string> {
    this.logger.log(`Generating code for: ${prefix} ... ${suffix}`);
    const url = `${process.env.OLLAMA_API_URL}/api/generate`;
    const prompt = `<PRE> ${prefix} <SUF>${suffix} <MID>`;
    const data = {
      model: this.model,
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.1,
      stream: false,
    };
    const response = await makeRequest(url, data);
    return response.response;
  }
}

@Injectable()
export class AiCompletionService {
  private provider: AIProvider;

  constructor(private readonly logger: LoggerServiceImplementation) {
    const provider = process.env.AI_PROVIDER || 'openai';
    this.logger.log(`Initializing provider: ${provider}`);
    switch (provider) {
      case 'openai':
        this.provider = new OpenAIProvider(this.logger);
        break;
      case 'codellama':
      case 'codegemma':
      case 'codestral':
        this.provider = new OllamaProvider(this.logger);
        break;
      default:
        this.logger.error(`Unsupported AI provider: ${provider}`);
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }

  async generateCode(prefix: string, suffix: string): Promise<string> {
    return this.provider.generateCode(prefix, suffix);
  }
}
