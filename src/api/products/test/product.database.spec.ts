import {ProductsService} from '../products.service';
import {ProductsController} from '../products.controller';
import {Test} from '@nestjs/testing';
import {MongooseModule} from '@nestjs/mongoose';
import {Product} from '../interfaces/product.interface';
import config from '../../../config/keys';
import {ProductSchema} from '../schemas/product.schema';

/**
 * REST and CRUD test, testing if all product routes preform as expected. If so the test will return an object.
 */
describe('Products Controller', () => {
    let controller: ProductsController;
    let service: ProductsService;

    const testBody = {
        name: 'test',
        price: 1,
        available: true,
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                MongooseModule.forRoot(config.mongoURI, {useNewUrlParser: true, useFindAndModify: false}),
                MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}]),
            ],
            controllers: [ProductsController],
            providers: [ProductsService],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
        controller = module.get<ProductsController>(ProductsController);
    });

    describe('API test', () => {
        it('all CRUD operations', async () => {

            // Creates a new test object with body equal to testBody and stores it in the database.
            let result =  await  controller.create(testBody);

            // Finds all objects stored in the database.
            await controller.findAll();

            // Finds an object that was created and stored with its ID.
            await controller.findOne(result.id);

            // New body object used for updating;
            const updatedBody = {
                    name: 'updatedTest',
                    price: 2,
                    available: false,
            };

            // Updates the created object with new body params from updatedBody object, using its ID.
            await controller.update(updatedBody, result.id);

            // If all of the above functions pass, the test delete function will remove the object from the database.
            // If it does so successfully the object returned is compared to the updatedBody object and if they match the test is completed.
            expect(await controller.delete(result.id)).toMatchObject(updatedBody);
        });
    });
});