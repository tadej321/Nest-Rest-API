import {ApiModelProperty} from '@nestjs/swagger';

/**
 * This class defines the shape of the data being sent. It is created from the body of a request, and is passed as the parameter to a CRUD method.
 */
export class CreateProductDto {

    @ApiModelProperty()
    readonly name: string;

    @ApiModelProperty()
    readonly price: number;

    @ApiModelProperty()
    readonly available: boolean;

}
