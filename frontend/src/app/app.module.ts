import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ItemComponent } from './components/pages/item/item.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { LoginComponent } from './components/pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { TitleComponent } from './components/partials/title/title.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { CategoriesComponent } from './components/partials/categories/categories.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { OrdersComponent } from './components/pages/orders/orders.component';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ItemComponent,
    CartComponent,
    LoginComponent,
    CheckoutComponent,
    FooterComponent,
    TitleComponent,
    CategoryComponent,
    CategoriesComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgImageFullscreenViewModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
      toastClass: 'customToast ngx-toastr'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [ CategoriesComponent ]
})
export class AppModule { }
