import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  updateOrderForm!: FormGroup;
  orders$: Observable<Order[]>;
  edit: boolean = false;
  currentOrder = {} as Order;
  currentFilter: string = 'Изчаква потвърждение';
  filters: string[] = ['Изчаква потвърждение', 'Потвърдена', 'Изпратена', 'Доставена', 'Отказана', 'Върната'];

  constructor(private orderService: OrderService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) {

      this.orders$ = this.orderService.getOrdersByStatus(this.currentFilter);
      this.updateOrderForm = this.formBuilder.group({
      status: ['', Validators.required]
    });
  }

  get fc() {
    return this.updateOrderForm.controls;
  }

  editOrder(order: Order) {
    this.edit = true;
    this.currentOrder = order;
    this.fc['status'].setValue(order.status);
  }

  submitOrder() {
    if (this.fc['status'].value === this.currentOrder.status) {
      this.edit = false;
      return
    }
    this.currentOrder.status = this.fc['status'].value;
    console.log(this.currentOrder);
    this.orderService.updateOrder(this.currentOrder).subscribe({
      next: () => {
        this.toastrService.success(`на поръчка номер ${this.currentOrder.id}`, 'Успешно актуализиране');
        window.location.reload();
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Грешка при актуализирането');
      }
    });
  }

  activateFilter(filter: string) {
    this.currentFilter = filter;
    this.orders$ = this.orderService.getOrdersByStatus(this.currentFilter);
  }
}
