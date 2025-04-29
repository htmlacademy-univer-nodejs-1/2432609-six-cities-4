import { Command } from './command.interface.js';
import { TsvFileReader } from '../../shared/libs/file-reader/index.js';
import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }

  private onImportedLine(line: string): void {
    const offer = createOffer(line);
    console.info('Imported offer:', offer);
  }

  private onCompleteImport(count: number): void {
    console.info(`Import completed: ${count} rows imported.`);
  }
}
