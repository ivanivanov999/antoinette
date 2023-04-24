import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ItemService } from 'src/app/services/item.service';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllproductsComponent {
  items$: Observable<Item[]> | undefined;
  activated: Observable<Params> | undefined;
  subscription: Subscription;

  constructor(private itemService: ItemService, activatedRoute: ActivatedRoute) {

    this.activated = activatedRoute.params;
    this.subscription = activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.items$ = this.itemService.getAllItemsBySearchTerm(params['searchTerm']);
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
