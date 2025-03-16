import { AIProvider } from '../ai-provider.interface';
import { LoggerServiceImplementation } from '../../logger/logger.service';
import { makeRequest } from '../../utils/ai-request';

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
