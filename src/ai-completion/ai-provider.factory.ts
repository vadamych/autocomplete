import { LoggerServiceImplementation } from '../logger/logger.service';
import { OpenAIProvider } from './providers/openai-provider';
import { OllamaProvider } from './providers/ollama-provider';
import { AIProvider } from './ai-provider.interface';

export function createAIProvider(
  providerName: string,
  logger: LoggerServiceImplementation,
): AIProvider {
  const providersMap: {
    [key: string]: new (logger: LoggerServiceImplementation) => AIProvider;
  } = {
    openai: OpenAIProvider,
    codellama: OllamaProvider,
    codegemma: OllamaProvider,
    codestral: OllamaProvider,
  };

  const ProviderClass = providersMap[providerName];

  if (!ProviderClass) {
    logger.error(`Unsupported AI provider: ${providerName}`);
    throw new Error(`Unsupported AI provider: ${providerName}`);
  }

  return new ProviderClass(logger);
}
