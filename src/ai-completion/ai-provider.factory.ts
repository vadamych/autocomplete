import { LoggerServiceImplementation } from '../logger/logger.service';
import { OpenAIProvider } from './providers/openai-provider';
import { CodellamaProvider } from './providers/codellama-provider';
import { CodegemmaProvider } from './providers/codegemma-privoder';
import { AIProvider } from './ai-provider.interface';

export function createAIProvider(
  providerName: string,
  logger: LoggerServiceImplementation,
): AIProvider {
  const providersMap: {
    [key: string]: new (logger: LoggerServiceImplementation) => AIProvider;
  } = {
    openai: OpenAIProvider,
    codellama: CodellamaProvider,
    codegemma: CodegemmaProvider,
    // codestral: CodellamaProvider,
  };

  const ProviderClass = providersMap[providerName];

  if (!ProviderClass) {
    logger.error(`Unsupported AI provider: ${providerName}`);
    throw new Error(`Unsupported AI provider: ${providerName}`);
  }

  return new ProviderClass(logger);
}
