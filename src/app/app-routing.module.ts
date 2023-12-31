import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ProductComponent } from './components/pages/product/product.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { AdminDashComponent } from './components/pages/admin-dash/admin-dash.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },        
    { path: 'home', component: LandingComponent},    
    { path: 'products', component: ProductsComponent},
    { path: 'product/:name', component: ProductComponent},
    { path: 'cart', component: CartComponent},
    { path: 'checkout', component: CheckoutComponent},
    { path: 'dashboard', component: AdminDashComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
