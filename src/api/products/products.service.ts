import {BadRequestException, Injectable} from '@nestjs/common';
import {Product} from './interfaces/product.interface';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    /**
     * This method preforms a READ operation on the database, and returns a promise of an array of all products
     *
     * @returns {Promise<Product[]>} - A JSON object
     */
    async findAll(): Promise<Product[]> {
        return await this.productModel.find();
    }

    /**
     * This method preforms a READ operation on the database using the id parameter, and returns a promise of one product.
     *
     * @param {string} id - A string param
     * @returns {Promise<Product>} - A JSON object
     */
    async findOne(id: string): Promise<Product> {
        try {
            return await this.productModel.findOne({ _id: id});
        } catch (e) {
            throw new BadRequestException();
        }
    }

    /**
     * This method preforms a CREATE operation on the database and creates a new product from the dto provided in the params.
     * It returns a promise of the newly created product.
     *
     * @param {Product} product - A DTO data transfer object
     * @returns {Promise<Product>} - A JSON object
     */
    async create(product: Product): Promise<Product> {
        return await this.productModel.create(product);
    }

    /**
     *This method preforms a DELETE operation on the database and deletes an existing object with whe same id provided.
     * It returns a promise of the deleted product.
     *
     * @param {string} id - A string param
     * @returns {Promise<Product>} - A JSON object
     */
    async delete(id: string): Promise<Product> {
        try {
            return await this.productModel.findByIdAndRemove(id);
        } catch (e) {
            throw new BadRequestException();
        }
    }

    /**
     * This method preforms an UPDATE operation on the database and updates the fields of an existing object with the newly provided fields.
     * It returns a promise of the updated product.
     *
     * @param {string} id - A string param
     * @param product - A DTO data transfer object
     * @returns {Promise<Product>} - A JSON object
     */
    async update(id: string, product): Promise<Product> {
        try {
            return await this.productModel.findByIdAndUpdate(id, product, { new: true });
        } catch (e) {
            throw new BadRequestException();
        }
    }
}
