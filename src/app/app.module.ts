import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './Components/add-category/add-category.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ChangeCredentialsComponent } from './Components/change-credentials/change-credentials.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductCardComponent } from './Components/product-card/product-card.component';
import { SearchUserComponent } from './Components/search-user/search-user.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { ViewProductComponent } from './Components/view-product/view-product.component';
import { RegisterComponent } from './Components/register/register.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CartComponent } from './Components/cart/cart.component';
import { PurchaseReportComponent } from './Components/purchase-report/purchase-report.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    ProductCardComponent,
    AddCategoryComponent,
    ChangeCredentialsComponent,
    SearchUserComponent,
    AddProductComponent,
    UpdateProductComponent,
    ViewProductComponent,
    RegisterComponent,
    FooterComponent,
    CartComponent,
    PurchaseReportComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    SidebarModule,
    CardModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    CalendarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
