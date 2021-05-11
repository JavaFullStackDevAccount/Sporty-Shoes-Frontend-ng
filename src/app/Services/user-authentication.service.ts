import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  private serverEndpoint = environment.serverUrl + "users"

  constructor(private _httpClient: HttpClient) { }

  authenticate(email:string, password:string){
    return this._httpClient.post(this.serverEndpoint+"/authenticate", {email, password});
  }
}
