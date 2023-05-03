import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent {

  categories$: Observable<Category[]> | undefined;
  activatedCategory: Observable<Params> = this.activatedRoute.params;

  constructor(private activatedRoute: ActivatedRoute, categoryService: CategoryService) {

    this.categories$ = categoryService.getAll();
  }

  activateCategory(category: string) {
    const allCategories = document.getElementsByClassName('category');
    for (let index = 0; index < allCategories.length; index++) {
      allCategories.item(index)?.classList.remove('active');

    }
    const selected = document.getElementById(category);
    selected?.classList.add('active');
  }

  scrollLeft() {
    const container: any = document.querySelector('.scrollContainer');
    container!.scrollLeft -= 300;
  }

  scrollRight() {
    const container = document.querySelector('.scrollContainer');
    if (container!.scrollLeft < container!.scrollWidth) {
      container!.scrollLeft += 300;
    }
  }
}
