import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from './components/new-product/new-product.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';

const routes: Routes = [
  { path: 'new-product', component: NewProductComponent},
  { path: 'new-category', component: NewCategoryComponent},
  { path: 'orders', component: OrdersComponent},
  { path: '', redirectTo: 'orders', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
