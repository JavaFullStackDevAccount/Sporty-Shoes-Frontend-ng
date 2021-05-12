import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/Models/place-order';
import { CartService } from 'src/app/Services/cart.service';
import { PurchaseService } from 'src/app/Services/purchase.service';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productsInCart: any = null;

  totalAmount: number = 0;

  constructor(
    private _cartService: CartService,
    private _userDataService: UserdataService,
    private _router: Router,
    private _purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    if (!this._userDataService.isLoggedIn()) this._router.navigate(['/']);

    this._cartService.getUserCart().subscribe((response: any) => {
      if (response && response['productDetails'])
        this.productsInCart = [...response['productDetails']];
      this.findTotalAmount();
    });
  }

  findTotalAmount() {
    const productsPrices = this.productsInCart.map(
      (product: any) => product['price']
    );

    this.totalAmount = productsPrices.reduce(
      (product1Price: any, product2Price: any): number =>
        product1Price + product2Price
    );
  }

  placeOrder(){
    const userId = this._userDataService.getUsersId();

    const order: Order = new Order(userId, this.productsInCart.map((product:any) => product["id"]) );

    this._purchaseService.placeOrder(order).subscribe((response:any) => {
      if(response){
        alert("Order successfully placed")
        this._router.navigate(["/dashboard"])
      } else {
        alert("Unable to place order right now !!!")
      }
    }, err =>  alert("Unable to place order right now !!!"))


  }
}
