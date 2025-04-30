import 'reflect-metadata';
import { CLIApplication, GenerateCommand, HelpCommand, ImportCommand, VersionCommand } from './сli/index.js';

function bootstrap() {
  const cliApp = new CLIApplication();

  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new GenerateCommand(),
    new ImportCommand()
  ]);

  cliApp.processCommand(process.argv);
}

bootstrap();
