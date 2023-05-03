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
import { CategoryComponent } from './components/pages/category/category.component';
import { CategoriesComponent } from './components/partials/categories/categories.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { DecorComponent } from './components/pages/decor/decor.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CarouselComponent } from './components/partials/carousel/carousel.component';
import { SearchComponent } from './components/partials/search/search.component';
import { AllproductsComponent } from './components/pages/allproducts/allproducts.component';
import { ProductsComponent } from './components/partials/products/products.component';
import { SharedModule } from './shared/shared.module';
import { MyProfileComponent } from './components/pages/my-profile/my-profile.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { NavigationComponent } from './components/partials/navigation/navigation.component';

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
    CategoryComponent,
    CategoriesComponent,
    LoadingComponent,
    DecorComponent,
    AboutComponent,
    CarouselComponent,
    SearchComponent,
    AllproductsComponent,
    ProductsComponent,
    MyProfileComponent,
    RegisterComponent,
    NavigationComponent
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
    }),
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [ CategoriesComponent ]
})
export class AppModule { }
