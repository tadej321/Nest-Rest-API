import {ApiModelProperty} from '@nestjs/swagger';

/**
 * Used for defining an example of the response in the swagger specification file.
 */
export class ProductClass {
    @ApiModelProperty({ example: '5d1fc76549f0622c206bf610', description: 'The unique ID of the product' })
    id: string;

    @ApiModelProperty({ example: 'computer1', description: 'The name of the product' })
    name: string;

    @ApiModelProperty({ example: 1000 , description: 'The price of the product' })
    price: number;

    @ApiModelProperty({ example: true , description: 'The availability of the product' })
    available: boolean;

    @ApiModelProperty({ example: '2019-07-05T21:55:49.390+00:00', description: 'The date of when the product was created' })
    date: string;
}