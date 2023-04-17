import { Schema, model } from "mongoose";

export interface Delivery {
    id: string;
    name: string;
    price: number;
}

export const DeliverySchema = new Schema<Delivery>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true}
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

export const DeliveryModel = model<Delivery>('delivery', DeliverySchema);