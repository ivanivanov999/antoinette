import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  current: string = '';

  constructor(router: Router) {
    let url: any = router.url;
    url = url.split('/').pop();
    setTimeout(() => {
      this.activateCategory(url);
    }, 100);
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
