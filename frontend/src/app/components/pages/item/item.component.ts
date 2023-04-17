import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  item$: Observable<Item> | undefined;
  constructor(private itemService: ItemService,
                      activatedRoute: ActivatedRoute,
                      private cartService: CartService,
                      private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.item$ = this.itemService.getItemById(params['id']);
      }
    })
  }

  addToCart(item: Item) {
    const add = document.querySelector(".add");
    const added = document.querySelector(".added");
    const addbutton = document.querySelector(".addbutton");
    if (add?.classList.contains("active")) {
      this.cartService.addToCart(item);
      add?.classList.remove("active");
      added?.classList.add("active");
      addbutton?.classList.add('active');
    }
    //this.router.navigateByUrl('/cart');
  }
}
