import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/models/cart';
import { Delivery } from 'src/app/shared/models/delivery.model';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  order: Order = new Order();
  checkoutForm!: FormGroup;
  cart: Cart = this.cartService.getCart();
  delivery$: Observable<Delivery[]>;


  constructor(public cartService: CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private itemService: ItemService,
              private orderService: OrderService,
              private router: Router)
  {
    this.order.items = this.cart.items;
    this.order.totalPrice = this.cart.totalPrice;
    this.delivery$ = this.itemService.getDeliveries();
  }

  ngOnInit(): void {
    let {name, address, phone} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
      phone: [phone, Validators.required]
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Моля попълнете всички полета', 'Невалидни данни');
      return;
    }

    this.order.name = this.fc['name'].value;
    this.order.address = this.fc['address'].value;
    this.order.phone = this.fc['phone'].value;

    this.orderService.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/orders');
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Няма продукти');
      }
    });
  }
}
