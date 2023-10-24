import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/pages/landing/landing.component';
import { ProductsComponent } from './components/pages/products/products.component';
import { ProductComponent } from './components/pages/product/product.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },    
    { path: 'home', component: LandingComponent},    
    { path: 'products', component: ProductsComponent},
    { path: 'product', component: ProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
