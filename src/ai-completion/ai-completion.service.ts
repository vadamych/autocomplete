import { Injectable } from '@nestjs/common';
import { createAIProvider } from './ai-provider.factory';
import { LoggerServiceImplementation } from '../logger/logger.service';
import { AIProvider } from './ai-provider.interface';

@Injectable()
export class AiCompletionService {
  private provider: AIProvider;

  constructor(private readonly logger: LoggerServiceImplementation) {
    const providerName = process.env.AI_PROVIDER || 'openai';
    this.logger.log(`Initializing provider: ${providerName}`);
    this.provider = createAIProvider(providerName, this.logger);
  }

  async generateCode(prefix: string, suffix: string): Promise<string> {
    return this.provider.generateCode(prefix, suffix);
  }
}
