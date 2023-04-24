import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  @Input() items: Item[] = [];

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
