import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  fullPath = {urlPath: [''], urlString: ['']};

  @Input()
  set category(category: string) {
    this.activatedRoute.url.subscribe((value) => {
      let path = value[0].path;
      if (path === 'cart') {
        this.fullPath = {urlPath: ['/','/cart'], urlString: ['Начало', 'Моята количка']};
      } else if (path === 'item') {
        this.fullPath = {urlPath: ['/','/category', `/category/${category}`], urlString: ['Начало', 'Всички продукти', category]}
      }
    });
  }

  constructor(private activatedRoute: ActivatedRoute) {
  }

}
