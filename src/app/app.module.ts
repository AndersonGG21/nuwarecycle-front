import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';



// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenubarModule } from 'primeng/menubar';
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { GalleriaModule } from 'primeng/galleria';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import {InputNumberModule} from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';


//Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { BestSellersComponent } from './components/best-sellers/best-sellers.component';
import { TestimonialBlockComponent } from './components/testimonial-block/testimonial-block.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { BentoGridComponent } from './components/bento-grid/bento-grid.component';
import { LandingComponent } from './components/pages/landing/landing.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ProductComponent } from './components/pages/product/product.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { HttpInterceptor } from './shared/interceptors/http.interceptor';
import { AlertComponent } from './components/alert/alert.component';
import { AdminDashComponent } from './components/pages/admin-dash/admin-dash.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BestSellersComponent,
    TestimonialBlockComponent,
    HeroSectionComponent,
    BentoGridComponent,
    LandingComponent,
    FooterComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    AlertComponent,
    AdminDashComponent,
    ProductsTableComponent,
    UsersTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    RippleModule,
    AutoCompleteModule,
    FormsModule,
    MenubarModule,
    CarouselModule,
    SidebarModule,
    AvatarModule,
    MenuModule,
    DataViewModule,
    RadioButtonModule,
    SliderModule,
    CheckboxModule,
    GalleriaModule,
    TabViewModule,
    DialogModule,
    BadgeModule,
    InputNumberModule,
    DropdownModule,    
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ApolloModule    
  ],
  providers: [CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

