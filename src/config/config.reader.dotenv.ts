import 'dotenv/config';
import { IConfigReader } from './config.reader.interface';
import { Injectable } from '@nestjs/common';
import { isNullish } from 'remeda';
import { InternalServerError } from '../errors/internal-server-error';
import { Nullable } from '../common.types';

@Injectable()
export class ConfigReaderDotEnv implements IConfigReader {
  public readMandatory(key: string): string {
    const foundInEnv = process.env[key];

    if (isNullish(foundInEnv)) {
      throw new InternalServerError(`config: ${key} is mandatory`);
    }
    return foundInEnv;
  }

  public readOptional(key: string, defaultValue: string): string {
    const foundInEnv = process.env[key];
    if (!foundInEnv) {
      return defaultValue;
    }
    return foundInEnv;
  }

  public readOrNull(key: string): Nullable<string> {
    return process.env[key] || null;
  }
}
