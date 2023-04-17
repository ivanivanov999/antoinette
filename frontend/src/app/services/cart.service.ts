import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../shared/models/item';
import { CartItem } from '../shared/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(item: Item): void {
    let cartItem = this.cart.items
      .find(items => items.item.id === item.id);
    if (cartItem) {
      this.increaseQuantity(cartItem.item.id);
      return;
    }
    this.cart.items.push(new CartItem(item));
    this.setCartToLocalStorage();
  }

  removeFromCart(itemId: string): void {
    this.cart.items = this.cart.items
      .filter(items => items.item.id != itemId);
    this.setCartToLocalStorage();
  }

  increaseQuantity(itemId: string) {
    let cartItem = this.cart.items
      .find(items => items.item.id === itemId);
    if (!cartItem) return;

    cartItem.quantity++;
    cartItem.price = cartItem.quantity * cartItem.item.price;
    this.setCartToLocalStorage();
  }

  decreaseQuantity(itemId: string) {
    let cartItem = this.cart.items
      .find(items => items.item.id === itemId);
    if (!cartItem) return;

    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      cartItem.price = cartItem.quantity * cartItem.item.price;
      this.setCartToLocalStorage();
    }
    else if (cartItem.quantity === 1) {
      cartItem.quantity--;
      cartItem.price = 0;
      this.removeFromCart(itemId);
    }
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
