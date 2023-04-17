import { model, Schema, Types } from 'mongoose';
import { Item, ItemSchema } from './item.model';
import { OrderStatus } from '../constants/order_status';

export interface OrderItem {
    item: Item;
    price: number;
    quantity: number;
};

export const OrderItemSchema = new Schema<OrderItem>(
    {
        item: {type: ItemSchema, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
    }
);

export interface Order {
    id: string;
    items: OrderItem[];
    totalPrice: number;
    name: string;
    address: string;
    phone: string;
    status: OrderStatus;
    user: Types.ObjectId;
    createdAt: string;
    updatedAt: Date;
};

const orderSchema = new Schema<Order>(
    {
        name: {type: String, required: true},
        address: {type: String, required: true},
        totalPrice: {type: Number, required: true},
        items: {type: [OrderItemSchema], required: true},
        status: {type: String, default: OrderStatus.WAITING},
        user: {type: Schema.Types.ObjectId, required: true},
        phone: {type: String, required: true}
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

export const OrderModel = model('order', orderSchema);