import { Module } from '@nestjs/common';
import { AICompletionController } from './ai-completion.controller';
import { AiCompletionService } from './ai-completion.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [AICompletionController],
  providers: [AiCompletionService],
})
export class AICompletionModule {}
