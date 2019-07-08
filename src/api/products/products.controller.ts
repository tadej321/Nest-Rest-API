import {Body, Controller, Delete, Get, Param, Post, Put,} from '@nestjs/common';
import {CreateProductDto} from './dto/create-product.dto';
import {ProductsService} from './products.service';
import {Product} from './interfaces/product.interface';
import {ApiBearerAuth, ApiImplicitParam, ApiOperation, ApiResponse, ApiUseTags,} from '@nestjs/swagger';
import {ProductClass} from './classes/product.class';

@ApiBearerAuth()
@ApiUseTags('products')
@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    /**
     * Get method that calls a Read method in product.service.ts. Return an array of products
     *
     * @returns {Promise<Product[]>} - A JSON object
     */
    @Get('/products')
    @ApiOperation({ title: 'Get all products' })
    @ApiResponse({
        status: 201,
        description: 'Successful pull of all products and their information',
        type: ProductClass,
    })
    findAll(): Promise<Product[]> {

         return this.productsService.findAll();
     }

    /**
     * Get method that calls a Read method in product.service.ts. Returns one product
     *
     * @param id - A string param
     * @returns {Promise<Product>} - A JSON object
     */
    @Get('/product/:id')
    @ApiOperation({ title: 'Obtain information about a specific product with the provided id' })
    @ApiResponse({
        status: 201,
        description: 'Successful pull of a product',
        type: ProductClass,
    })
    @ApiImplicitParam({
        name: 'id',
        description: 'ID of the product',
        required: true,
        type: String
    })
    @ApiResponse({ status: 404, description: 'Product not found, please try a different ID' })
    findOne(@Param('id') id): Promise<Product> {

        return this.productsService.findOne(id);

    }

    /**
     * Post method that calls a Create method in product.service.ts. returns created product
     *
     * @param {CreateProductDto} createProductDto - A DTO data transfer object param
     * @returns {Promise<Product>} - A JSON object
     */
    @Post('/product')
    @ApiOperation({ title: 'Creates a new product with the information provided by the user and stores it in the database' })
    @ApiResponse({
        status: 201,
        description: 'Product successfully created',
        type: ProductClass,
    })
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }

    /**
     * Delete method that calls a Delete method in product.service.ts. returns deleted product
     *
     * @param id - A string param
     * @returns {Promise<Product>} - A JSON object
     */
    @Delete('/product/:id')
    @ApiOperation({ title: 'Removes an existing product from the database by the provided id' })
    @ApiResponse({
        status: 201,
        description: 'Product successfully removed',
        type: ProductClass,
    })
    @ApiImplicitParam({
        name: 'id',
        description: 'ID of the product',
        required: true,
        type: String
    })
    @ApiResponse({ status: 404, description: 'Product not found, please try a different ID' })
    delete(@Param('id') id): Promise<Product> {
        return this.productsService.delete(id);
    }

    /**
     * Put method that calls an Update method in product.service.ts. returns updated product
     *
     * @param {CreateProductDto} updateItemDto - A DTO data transfer object param
     * @param id - A string param
     * @returns {Promise<Product>} - A JSON object
     */
    @Put('/product/:id')
    @ApiOperation({ title: 'Edits the information of an existing product stored in the database and overwrites the stored product' })
    @ApiResponse({
        status: 201,
        description: 'Product successfully edited',
        type: ProductClass,
    })
    @ApiImplicitParam({
        name: 'id',
        description: 'ID of the product',
        required: true,
        type: String
    })
    @ApiResponse({ status: 404, description: 'Product not found, please try a different ID' })
    update(@Body() updateItemDto: CreateProductDto, @Param('id') id): Promise<Product> {
        return this.productsService.update(id, updateItemDto);
    }
}
