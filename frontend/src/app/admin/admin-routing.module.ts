import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'new-product', component: NewProductComponent},
    { path: 'orders', component: OrdersComponent}
  ]},
  { path: '', redirectTo: 'dashboard/orders', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
