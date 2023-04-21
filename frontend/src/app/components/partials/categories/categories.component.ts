import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { sample_items } from 'src/data';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {

  @Input()
  categories: Category[] = sample_items;

  current: string = '';

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params['category']) {
        this.current = params['category'];
        setTimeout(() => {
          this.activateCategory(this.current);
        }, 100);
      }
    });
  }

  activateCategory(category: string) {
    const allCategories = document.getElementsByClassName('category');
    for (let index = 0; index < allCategories.length; index++) {
      allCategories.item(index)?.classList.remove('active');

    }
    const selected = document.getElementById(category);
    selected?.classList.add('active');
  }
}
