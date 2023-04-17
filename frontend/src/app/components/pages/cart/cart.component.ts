import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart$: Observable<Cart>;

  constructor(private cartService: CartService, private router: Router) {
    this.cart$ = this.cartService.getCartObservable();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.item.id);
  }

  increaseQuantity(itemId: string) {
    this.cartService.increaseQuantity(itemId);
  }

  decreaseQuantity(itemId: string) {
    this.cartService.decreaseQuantity(itemId);
  }

  proceed() {
    this.router.navigateByUrl('/checkout');
  }
}
