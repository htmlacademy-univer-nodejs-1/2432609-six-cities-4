import got from 'got';
import { Command } from './command.interface.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { TsvOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TsvFileWriter } from '../../shared/libs/file-writer/index.js';
import { getErrorMessage } from '../../shared/helpers/common.js';

export class GenerateCommand implements Command {
  private initialData!: MockServerData;

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created successfully!`);
    } catch (error) {
      console.error(' Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }

  private async load(url: string): Promise<void> {
    try {
      this.initialData = await got.get(url).json<MockServerData>();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number): Promise<void> {
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }
}
