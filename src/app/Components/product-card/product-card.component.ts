import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input('productDetails') productDetails: any;

  @Output('deleteProductEvent') deleteProductEvent = new EventEmitter<number>();

  category: string = '';

  description: string = '';

  title: string = '';

  thumbnail: string = '';

  price: number = 0;

  productId: number = -10;

  isAdmin: boolean = false;

  constructor(
    private _router: Router,
    private _userDataService: UserdataService,
    private _cartService: CartService
  ) {}
  /**
 * category: {id: 1, name: "Male", picture: "Na"}
description: "product 1 desc"
id: 1
name: "product 1"
picture1: "https://cdn.vox-cdn.com/thumbor/S4ka2uwWyJ9rHJFDwVa8BQCqMHA=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22406771/Exbfpl2WgAAQkl8_resized.jpeg"
price: 1200
 */
  ngOnInit(): void {
    console.log(this.productDetails);

    this.category = this.productDetails['category']['name'];
    this.description = this.productDetails['description'];
    this.title = this.productDetails['name'];
    this.thumbnail = this.productDetails['picture1'];
    this.price = this.productDetails['price'];
    this.productId = this.productDetails['id'];

    this.isAdmin = this._userDataService.isAdmin();
  }

  viewProduct() {
    this._router.navigate(['/view/' + this.productId]);
  }

  deleteProduct() {
    this.deleteProductEvent.emit(this.productId);
  }

  updateProduct() {
    this._router.navigate(['/update-product/' + this.productId]);
  }

  
}
