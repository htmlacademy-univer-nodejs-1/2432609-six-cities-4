#!/usr/bin/env node


import { CLIApplication, HelpCommand, ImportCommand, VersionCommand } from './сli/index.js';
function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
