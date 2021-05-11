import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from '../Models/category-details';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private serverEndpoint = environment.serverUrl + 'categories';

  constructor(private _httpClient: HttpClient) {}

  getAllCategories() {
    return this._httpClient.get(this.serverEndpoint + '/all');
  }

  addNewCategory(category: any){
    return this._httpClient.post(this.serverEndpoint+"/add", category);
  }
}
