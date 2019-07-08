import {APP_FILTER} from '@nestjs/core';
import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ProductsController} from './products.controller';
import {ProductsService} from './products.service';
import {ProductSchema} from './schemas/product.schema';
import {Model} from 'mongoose';

import {HttpExceptionFilter} from './http-exception.filter';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
    controllers: [ProductsController],
    providers: [ProductsService, {provide: APP_FILTER, useClass: HttpExceptionFilter}]
})
export class ProductModule {
    
}
