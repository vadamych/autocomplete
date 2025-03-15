import { Module } from '@nestjs/common';
import { AutocompleteController } from './autocomplete.controller';
import { AiCompletionService } from './ai-completion.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [AutocompleteController],
  providers: [AiCompletionService],
})
export class AutocompleteModule {}
