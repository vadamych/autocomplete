import { Controller, Post, Body } from '@nestjs/common';
import { AiCompletionService } from './ai-completion.service';
import { LoggerServiceImplementation } from '../logger/logger.service';

@Controller('autocomplete')
export class AutocompleteController {
  constructor(
    private readonly aiCompletionService: AiCompletionService,
    private readonly loggerService: LoggerServiceImplementation,
  ) {}

  @Post()
  async completeCode(@Body() body: { prefix: string; suffix: string }) {
    this.loggerService.log(
      `Received request with prefix: ${body.prefix} and suffix: ${body.suffix}`,
    );
    const result = await this.aiCompletionService.generateCode(
      body.prefix,
      body.suffix,
    );
    this.loggerService.log('Code generation successful');
    return result;
  }
}
