import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, combineLatest, map, merge, take } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';
import { ItemAndSimilar } from 'src/app/shared/models/item-and-similar';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnDestroy {
  imageSrc: string = '';
  items$: Observable<ItemAndSimilar> | undefined;

  sub: Subscription | undefined;
  error: boolean = false;

  constructor(itemService: ItemService,
              activatedRoute: ActivatedRoute,
              private cartService: CartService) {

    this.sub = activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.items$ = itemService.getItemAndSimilarById(params['id']);
        this.items$.subscribe({
          next: (value) => {
            this.error = false;
            this.imageSrc = value.item.imageUrl[0];
          },
          error: () => { this.error = true }
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe;
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
