import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {

  productDetails:any;

  productId:number = -10;

  isAdmin: boolean = false;



  constructor(
    private _router: Router,
    private _userDataService: UserdataService,
    private _productService: ProductsService,
    private _activatedRouter: ActivatedRoute,
    private _cartService: CartService
  ) {}

  ngOnInit(): void {
    if (!this._userDataService.isLoggedIn()) this._router.navigate(['/']);

    this.isAdmin = this._userDataService.isAdmin()

    try {
      this._activatedRouter.params.subscribe((params: any) => {
        if (params['id']) {
          const id = parseInt(params['id']);
          this._productService.getProductById(id).subscribe((response: any) => {
            console.log(response);
            this.productDetails ={...response}
            this.productId = id;
          });
          if (id) {
          } else {
            this.rollBack();
          }
        }
      });
    } catch (error) {
      this.rollBack();
    }
  }

  rollBack(showAlert: boolean = true) {
    if (showAlert) alert('Problem getting the product');
    this._router.navigate(['/dashboard']);
  }

  addToCart() {
    this._cartService.addToCart(this.productId).subscribe(
      (response: any) => {
        if (response) {
          alert('Item added to cart');
        } else {
          alert('Problem adding item to cart !!');
        }
      },
      (err) => {
        alert('Problem adding item to cart !!');
      }
    );
  }
}
