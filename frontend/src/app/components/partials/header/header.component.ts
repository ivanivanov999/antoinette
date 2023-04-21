import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/app/shared/models/cart';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  cart$: Observable<Cart>;
  user$: Observable<User>;
  constructor(private cartService: CartService, private userService: UserService) {
    this.cart$ = this.cartService.getCartObservable();
    this.user$ = userService.getUserObservable();
    //this.initialize();
  }

  logout() {
    this.userService.logout();
  }

  handleSandwichClick() {
    const menu = document.querySelector(".menu");
    menu?.classList.toggle("active");
  }

  initialize() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      const hamburger = document.querySelector(".hamburger");
      const menu = document.querySelector(".menu");
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos + 15) {
        hamburger?.classList.add("active");
        menu?.classList.add("active");
      } else if (prevScrollpos < currentScrollPos - 30) {
        hamburger?.classList.remove("active");
        menu?.classList.remove("active");
      }
      prevScrollpos = currentScrollPos;
    }
  }
}
