import {ProductsService} from '../products.service';
import {ProductsController} from '../products.controller';
import {Test} from '@nestjs/testing';
import {getModelToken} from '@nestjs/mongoose';
import {Product} from '../interfaces/product.interface';

/**
 * Isolated service tests using mocked service functions, should return true.
 */
describe('Products Controller', () => {
    let controller: ProductsController;
    let service: ProductsService;
    let spy: any;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [ProductsService, {
                provide: getModelToken('Product'),
                useValue: {
                    find: () => true,
                    findOne: ({ _id: id}) => true,
                    create: (product: Product) => true,
                    findByIdAndRemove: (id: String) => true,
                    findByIdAndUpdate: (id: String, product: Product) => true
                },
            }],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        spy = module.get(getModelToken('Product'));

        spy.save = jest.fn();
    });

    describe('findAll', () => {
        it('find()', async () => {

            expect(await service.findAll()).toBe(true);
        });
    });
    describe('findOne', () => {
        it('findOne()', async () => {

            expect(await service.findOne('id')).toBe(true);
        });
    });
    describe('save', () => {
        it('create()', async () => {

            const testBody = {
                name: 'name',
                price: 1,
                available: true,
            };

            expect(await service.create(testBody)).toBe(true);
        });
    });
    describe('findByIdAndUpdate', () => {
        it('findByIdAndUpdate()', async () => {

            const testBody = {
                name: 'name',
                price: 1,
                available: true
            };

            expect(await service.update('id', testBody)).toBe(true);
        });
    });
    describe('findByIdAndRemove', () => {
        it('findByIdAndRemove()', async () => {

            expect(await service.delete('id')).toBe(true);
        });
    });
});
