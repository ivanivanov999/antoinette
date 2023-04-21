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
}
