import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../Models/product-details';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private serverEndpoint = environment.serverUrl + 'products';

  constructor(private _httpClient: HttpClient) {}

  getAllProducts() {
    return this._httpClient.get(this.serverEndpoint + '/all');
  }

  getProductById(productId: number) {
    return this._httpClient.get(this.serverEndpoint + '/get?id=' + productId);
  }

  updateProduct(productId: number, updatedProduct: Product) {
    return this._httpClient.put(
      this.serverEndpoint + '/put/' + productId,
      updatedProduct
    );
  }

  deleteProduct(productId: number) {
    return this._httpClient.delete(
      this.serverEndpoint + '/delete?id=' + productId
    );
  }

  addNewProduct(productToAdd: Product) {
    return this._httpClient.post(this.serverEndpoint + '/add', productToAdd);
  }
}
