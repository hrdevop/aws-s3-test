import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { MONGOOSE_URL } from 'src/environments';

export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: MONGOOSE_URL,
      maxPoolSize: 2,
    };
  }
}
