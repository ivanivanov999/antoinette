import { CartItem } from "./cart-item";

export class Order {
  id!: string;
  items!: CartItem[];
  totalPrice!: number;
  name!: string;
  address!: string;
  createdAt!: string;
  phone!: string;
  status!: string;
}
