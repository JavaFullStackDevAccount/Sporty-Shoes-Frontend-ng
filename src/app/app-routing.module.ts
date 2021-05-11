import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './Components/add-category/add-category.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { CartComponent } from './Components/cart/cart.component';
import { ChangeCredentialsComponent } from './Components/change-credentials/change-credentials.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { PurchaseReportComponent } from './Components/purchase-report/purchase-report.component';
import { RegisterComponent } from './Components/register/register.component';
import { SearchUserComponent } from './Components/search-user/search-user.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { ViewProductComponent } from './Components/view-product/view-product.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'users-search', component: SearchUserComponent },
  { path: 'view/:id', component: ViewProductComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'update-product/:id', component: UpdateProductComponent },
  { path: 'update-credential', component: ChangeCredentialsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'purchase-report', component: PurchaseReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
