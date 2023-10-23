import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


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
    CheckboxModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
