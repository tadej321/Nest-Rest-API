import {Test} from '@nestjs/testing';
import {ProductsController} from '../products.controller';
import {ProductsService} from '../products.service';
import {getModelToken} from '@nestjs/mongoose';
import {ProductSchema} from '../schemas/product.schema';
import {Model} from 'mongoose';
import {Product} from '../interfaces/product.interface';

/**
 * Isolated controller tests using mocked service, should return product schema.
 */
describe('Products Controller', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
      const module = await Test.createTestingModule({

          controllers: [ProductsController],
          providers: [ProductsService, {
              provide: getModelToken('Product'),
              useValue: {},
          }],
      }).compile();

    service = module.get<ProductsService>(ProductsService);
    controller = module.get<ProductsController>(ProductsController);
    });


    describe('FindAll', () => {
        it('findAll()', async () => {


            const result = ProductSchema;
            jest.spyOn(service, 'findAll').mockImplementation(() => result);

            expect(await controller.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('findOne()', async () => {

            const result = ProductSchema;
            jest.spyOn(service, 'findOne').mockImplementation(() => result);

            expect(await controller.findOne('id')).toBe(result);

        });
    });

    describe('create', () => {
        it('create()', async () => {

            const result = ProductSchema;
            jest.spyOn(service, 'create').mockImplementation(() => result);

            const body = {
                name: "test",
                price: 100,
                available: true
            };

            expect(await controller.create(body)).toBe(result);
        });
    });

    describe('update', () => {
        it('update()', async () => {

            const result = ProductSchema;
            jest.spyOn(service, 'update').mockImplementation(() => result);

            const body = {
                name: "test",
                price: 100,
                available: true
            };

            expect(await controller.update(body, 'id')).toBe(result);

        });
    });

    describe('delete', () => {
        it('delete()', async () => {

            const result = ProductSchema;
            jest.spyOn(service, 'delete').mockImplementation(() => result);

            expect(await controller.delete('5d2283fd55a90008306a2d58')).toBe(result);

        });
    });
});