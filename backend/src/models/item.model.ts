import { Schema, model } from "mongoose";

export interface Item {
    id: string;
    name: string;
    price: number;
    tags: string[];
    category: string;
    favorite: boolean;
    imageUrl: string[];
    origins: string[];
    description: string;
}

export const ItemSchema = new Schema<Item>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String]},
        category: {type: String, required: true},
        favorite: {type: Boolean, default: false},
        imageUrl: {type: [String], required: true},
        origins: {type: [String]},
        description: {type: String, required: true},
    }, {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
);

export const ItemModel = model<Item>('item', ItemSchema);