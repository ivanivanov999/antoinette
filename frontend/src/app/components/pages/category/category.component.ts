import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  items$: Observable<Item[]> | undefined;
  category: string = '';

  constructor(private itemService: ItemService,
                      activatedRoute: ActivatedRoute,
                      private cartService: CartService,
                      private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params['category']) {
        this.items$ = this.itemService.getAllItemsByCategory(params['category']);
        this.category = params['category'];
      } else {
        this.category = 'Категория';
      }
    });
  }
}
