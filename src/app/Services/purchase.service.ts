import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { Order } from '../Models/place-order';
import { UserdataService } from './userdata.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private serverEndpoint = environment.serverUrl + "orders"

  constructor(private _httpClient:HttpClient) { }

  getAllOrders(){
    return this._httpClient.get(this.serverEndpoint+"/get");
  }

  placeOrder(order: Order){
    return this._httpClient.post(this.serverEndpoint+"/add", order);
  }


}
