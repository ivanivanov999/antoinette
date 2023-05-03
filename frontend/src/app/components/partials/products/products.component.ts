import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  constructor(private cartService: CartService,
              private toastrService: ToastrService,
              private itemService: ItemService)
  {}

  allItems: Item [] = [];

  @Input() set items(items: Item[])  {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (this.itemService.favorites.includes(item.id)) {
        item.favorite = true;
      }
      if (index === items.length - 1) {
        this.allItems = items;
      }
    }
  };

  addToCart(item: Item) {
    this.cartService.addToCart(item);
    this.toastrService.success(
      `${item.name}`,
      `Добавихте в количката си`
    );
  }

  addToFavorites(itemId: string) {
    this.itemService.addToFavorites(itemId);
    let favoriteIcons = document.getElementsByClassName(itemId);
    favoriteIcons[0].classList.toggle('active');
    favoriteIcons[1].classList.toggle('active');
  }

  removeFromFavorites(itemId: string) {
    this.itemService.removeFromFavorites(itemId);
    let favoriteIcons = document.getElementsByClassName(itemId);
    favoriteIcons[0].classList.toggle('active');
    favoriteIcons[1].classList.toggle('active');
  }
}
