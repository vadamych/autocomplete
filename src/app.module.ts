import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AICompletionModule } from './ai-completion/ai-completion.module';
import { AICompletionController } from './ai-completion/ai-completion.controller';
import { AiCompletionService } from './ai-completion/ai-completion.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { LoggerServiceImplementation } from './logger/logger.service';

@Module({
  imports: [ConfigModule.forRoot(), AICompletionModule, LoggerModule],
  controllers: [AICompletionController, AppController],
  providers: [AiCompletionService, AppService, LoggerServiceImplementation],
})
export class AppModule {}
