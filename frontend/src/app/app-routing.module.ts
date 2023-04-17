import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { ItemComponent } from './components/pages/item/item.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { CategoryComponent } from './components/pages/category/category.component';
import { AdminGuard } from './auth/guards/admin.guard';
import { OrdersComponent } from './components/pages/orders/orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'cart', component: CartComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  { path: 'category/:category', component: CategoryComponent},
  { path: 'category', redirectTo: 'category/Сервизи%20за%20хранене'},
  { path: 'orders', component: OrdersComponent},
  {
    path: 'admin',
    canLoad: [AdminGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
