import { AIProvider } from '../ai-provider.interface';
import { LoggerServiceImplementation } from '../../logger/logger.service';
import { makeRequest } from '../../utils/ai-request';

export class CodegemmaProvider implements AIProvider {
  private model: string;

  constructor(private readonly logger: LoggerServiceImplementation) {
    this.model = process.env.AI_PROVIDER || 'codellama';
    this.logger.log(`CodegemmaProvider initialized with model: ${this.model}`);
  }

  async generateCode(prefix: string, suffix: string): Promise<string> {
    this.logger.log(`Generating code for: ${prefix} ... ${suffix}`);
    const url = `${process.env.OLLAMA_API_URL}/api/generate`;
    console.log('url', url);
    const prompt = `<|fim_prefix|>${prefix}<|fim_suffix|>${suffix}<|fim_middle|>`;
    const data = {
      //   model: this.model,
      model: 'codegemma:2b-code',
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.5,
      stream: false,
    };
    const response = await makeRequest(url, data);
    return response.response;
  }
}
