import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/order';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProfileComponent {
  user: User;
  orders$: Observable<Order[]>;

  constructor(userService: UserService, orderService: OrderService) {
    this.user = userService.currentUser;
    this.orders$ = orderService.getMyOrders();
  }
}
