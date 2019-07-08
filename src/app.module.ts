import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductModule} from './api/products/products.module';
import {MongooseModule} from '@nestjs/mongoose';
import config from './config/keys';

@Module({
  imports: [ProductModule, MongooseModule.forRoot(config.mongoURI, {useNewUrlParser: true, useFindAndModify: false})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
