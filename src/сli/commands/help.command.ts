import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(
      `${chalk.bgBlue.white.bold(' Программа для подготовки данных для REST API сервера ')}\n\n` +
      `${chalk.hex('#FFA500').bold('Пример:')}\n` +
      `  ${chalk.gray('cli.js')} --<${chalk.hex('#00FFFF')('command')}> [${chalk.hex('#7CFC00')('--arguments')}]\n\n` +

      `${chalk.hex('#FFA500').bold('Команды:')}\n` +

      `  ${chalk.hex('#FF69B4')('--version')}:                   ${chalk.gray('# выводит номер версии')}\n` +
      `  ${chalk.hex('#00CED1')('--help')}:                      ${chalk.gray('# печатает этот текст')}\n` +
      `  ${chalk.hex('#8A2BE2')('--import')} <path>:             ${chalk.gray('# импортирует данные из TSV')}\n` +
      `  ${chalk.hex('#FFD700')('--generate')} <n> <path> <url>  ${chalk.gray('# генерирует произвольное количество тестовых данных')}\n`
    );
  }
}
