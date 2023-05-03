import { Schema, model } from "mongoose"

export interface Category {
    id: string,
    name: string,
    imageUrl: string,
    rank: number;
}

export const CategorySchema = new Schema<Category>(
    {
        name: {type: String, required: true},
        imageUrl: {type: String, required: true},
        rank: {type: Number, default: 1}
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

export const CategoryModel = model<Category>('category', CategorySchema);