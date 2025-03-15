import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AutocompleteModule } from './autocomplate/autocomplete.module';
import { AutocompleteController } from './autocomplate/autocomplete.controller';
import { AiCompletionService } from './autocomplate/ai-completion.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';
import { LoggerServiceImplementation } from './logger/logger.service';

@Module({
  imports: [ConfigModule.forRoot(), AutocompleteModule, LoggerModule],
  controllers: [AutocompleteController, AppController],
  providers: [AiCompletionService, AppService, LoggerServiceImplementation],
})
export class AppModule {}
