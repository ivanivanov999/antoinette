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
import { DecorComponent } from './components/pages/decor/decor.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AllproductsComponent } from './components/pages/allproducts/allproducts.component';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { RegisterComponent } from './components/pages/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'item/:id', component: ItemComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  { path: 'category/:category', component: CategoryComponent},
  { path: 'category', redirectTo: 'category/Сервизи%20за%20хранене'},
  { path: 'decor', component: DecorComponent},
  { path: 'about', component: AboutComponent},
  { path: 'products', component: AllproductsComponent},
  { path: 'search/:searchTerm', component: AllproductsComponent},
  { path: 'profile', component: MyProfileComponent, canActivate: [AuthGuard]},
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
