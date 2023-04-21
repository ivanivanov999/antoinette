import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, combineLatest, map, merge, take } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnDestroy {
  imageSrc: string = '';
  item$: Observable<Item> | undefined;

  tag: string = '';
  category: string = '';
  tags$: Observable<Item[]> | undefined;
  categories$: Observable<Item[]> | undefined;

  similarItems$: Observable<Item[]> | undefined;

  sub1: Subscription | undefined;
  sub2: Subscription | undefined;

  constructor(itemService: ItemService,
              activatedRoute: ActivatedRoute,
              private cartService: CartService) {

    this.sub1 = activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.item$ = itemService.getItemById(params['id']);
        this.sub2 = this.item$.subscribe(item => {
          this.tag = item.tags ? item.tags[0] : '';
          this.category = item.category;
          this.categories$ = itemService.getAllItemsByCategory(this.category).pipe(take(4));
          if (this.tag !== '') {
            this.tags$ = itemService.getAllItemsByTag(this.tag).pipe(take(4));
            this.similarItems$ = combineLatest(this.tags$, this.categories$).pipe(map(value => [...new Map([...value[0], ...value[1]].map((m) => [m.id, m])).values()].filter(newItem => newItem.id != item.id)));
          } else {
            this.similarItems$ = this.categories$;
          }
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.sub1?.unsubscribe;
    this.sub2?.unsubscribe;
  }

  activateImage(image: string, i: number) {
    const images = document.getElementsByClassName('sub-picture');
    for (let index = 0; index < images.length; index++) {
      images[index].classList.remove('active');
    }
    this.imageSrc = image;
    document.querySelector(`.id${i}`)?.classList.add('active');
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
