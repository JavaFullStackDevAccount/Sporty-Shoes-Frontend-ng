import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserdataService } from './userdata.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private serverEndpoint = environment.serverUrl + 'cart';

  constructor(
    private _httpClient: HttpClient,
    private _userDataService: UserdataService
  ) {}

  getUserCart() {
    return this._httpClient.get(
      this.serverEndpoint + '/get?id=' + this._userDataService.getUsersId()
    );
  }

  addToCart(productId: number) {
    const cartId = this._userDataService.getUsersId();
    return this._httpClient.post(this.serverEndpoint + '/add', {
      cartId,
      productId,
    });
  }
}
