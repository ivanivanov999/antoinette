import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnDestroy{
  items$: Observable<Item[]> | undefined;
  activated: Observable<Params> | undefined;
  subscription: Subscription;

  constructor(private itemService: ItemService, activatedRoute: ActivatedRoute) {

    this.activated = activatedRoute.params;
    this.subscription = activatedRoute.params.subscribe((params) => {
      if (params['category']) {
        this.items$ = this.itemService.getAllItemsByCategory(params['category']);
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
