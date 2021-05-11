import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  allProducts: any = null;

  display = true;

  avaliableOptions: any = [];

  userEmailInDashboard: any = '';

  constructor(
    private _productService: ProductsService,
    private _userDataService: UserdataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!this._userDataService.isLoggedIn()) this._router.navigate(['/']);

    this.avaliableOptions = [...this.getMenu()];
    this.userEmailInDashboard = this.setEmail();
    this._productService.getAllProducts().subscribe((response: any) => {
      if (response) {
        this.allProducts = [...response];
        console.log(response);
      }
    });
  }

  setEmail() {
    console.log(this._userDataService.getUsersEmail());
    return this._userDataService.getUsersEmail();
  }

  getMenu(): any[] {
    const adminOptionsAndLinks = [
      { name: 'Add category', link: '/add-category' },
      { name: 'Add product', link: '/add-product' },
      { name: 'View purchase report', link: '/purchase-report' },
      { name: 'Search user', link: '/users-search' },
      { name: 'Change password', link: '/update-credential' },
    ];

    const userOptionsAndLinks = [
      { name: 'Home', link: '/dashboard' },
      { name: 'My cart', link: '/cart' },
    ];
    return this._userDataService.isAdmin()
      ? adminOptionsAndLinks
      : userOptionsAndLinks;
  }

  holderFunction = () => {
    console.log('Hello clicked');
  };

  deleteProduct(productId: number) {
    this._productService.deleteProduct(productId).subscribe((response) => {
      this.ngOnInit();
    });
  }
}
