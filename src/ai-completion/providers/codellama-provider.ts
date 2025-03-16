import { AIProvider } from '../ai-provider.interface';
import { LoggerServiceImplementation } from '../../logger/logger.service';
import { makeRequest } from '../../utils/ai-request';

export class CodellamaProvider implements AIProvider {
  private model: string;

  constructor(private readonly logger: LoggerServiceImplementation) {
    this.model = process.env.AI_PROVIDER || 'codellama';
    this.logger.log(`CodellamaProvider initialized with model: ${this.model}`);
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
