import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription, of, tap } from 'rxjs';
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
  initialItems: Item[] = [];
  activated: Observable<Params> | undefined;
  subscription: Subscription;

  currentFilter: string = 'Най-нови';
  filters: string[] = ['Най-нови', 'Най-стари', 'Цена (най-ниска)', 'Цена (най-висока)'];

  constructor(private itemService: ItemService, activatedRoute: ActivatedRoute) {

    this.activated = activatedRoute.params;
    this.subscription = activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.items$ = this.itemService.getAllItemsBySearchTerm(params['searchTerm']).pipe(tap((items)=> {
          this.initialItems = items.reverse();
        }));
        if (document.getElementById('s')) {
          (document.getElementById('s') as HTMLSelectElement).value = 'Най-нови';
        }
      }
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  activateFilter(filter: string) {
    this.currentFilter = filter;
    let itemArray = JSON.parse(JSON.stringify(this.initialItems));
    if (filter === 'Най-нови') {
      this.items$ = of(this.initialItems);
    } else if (filter === 'Най-стари') {
      this.items$ = of(itemArray.reverse());
    } else {
      this.items$ = of(itemArray.sort(function (a: Item, b: Item) {
        if (filter === 'Цена (най-ниска)') {
          return a.price - b.price
        }
        else return b.price - a.price;
      }))
    }
  }
}
