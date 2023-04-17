import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Cover, Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cover = {} as Cover;
  items$: Observable<Item[]> | undefined;
  constructor(private itemService: ItemService, activatedRoute: ActivatedRoute) {
    this.cover = this.itemService.getCover();

    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.items$ = this.itemService.getAllItemsBySearchTerm(params['searchTerm']);
      } else {
        this.items$ = this.itemService.getAll();
      }
    })
  }

  scrollLeft() {
    const leftButton = document.querySelector(".scrollleft");
    const container: any = document.querySelector('.scrollContainer');
    container!.scrollLeft -= 300;
  }

  scrollRight() {
    const rightButton = document.querySelector(".scrollright");
    const container = document.querySelector('.scrollContainer');
    if (container!.scrollLeft < container!.scrollWidth) {
      container!.scrollLeft += 300;
    }
  }
}
