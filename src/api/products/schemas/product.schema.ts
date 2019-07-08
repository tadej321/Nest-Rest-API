import * as mongoose from 'mongoose';

/**
 * A schema that defines how an object stored in the database should look.
 * ID is not included since it is autogenerated by the database.
 */
export const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        required: true,
    },
    create_date: {
        type: Date,
        default: Date.now,
    },
});