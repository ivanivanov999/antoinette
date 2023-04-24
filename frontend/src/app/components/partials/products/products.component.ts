import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private cartService: CartService, private toastrService: ToastrService) {}

  @Input() items: Item[] = [];

  addToCart(item: Item) {
    this.cartService.addToCart(item);
    this.toastrService.success(
      `${item.name}`,
      `Успешно добавихте`
    );
  }
}
