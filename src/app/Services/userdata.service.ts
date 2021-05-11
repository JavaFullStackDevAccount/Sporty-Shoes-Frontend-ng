import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewCredentials } from '../Models/update-password';
import { User } from '../Models/user-details';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RegisterUser } from '../Models/register-user';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private USER_KEY = 'USER';

  private serverEndpoint = environment.serverUrl + 'users';

  constructor(private _httpClient: HttpClient) {}

  saveUser(userToSave: User) {
    const storage = sessionStorage ? sessionStorage : localStorage;
    storage.setItem(this.USER_KEY, JSON.stringify(userToSave));
  }

  /**
   * {"userName":"admin","userEmail":"admin@admin.com","isAdmin":true}
   */
  private getSavedUser = () => {
    const storage = sessionStorage ? sessionStorage : localStorage;
    if (storage) {
      const extractedUser = storage.getItem(this.USER_KEY);
      return extractedUser ? JSON.parse(extractedUser) : null;
    }
  };

  isAdmin(): boolean {
    const savedUser = this.getSavedUser();
    return savedUser ? savedUser['isAdmin'] : false;
  }

  isLoggedIn(): boolean {
    return this.getSavedUser() ? true : false;
  }

  getUsersEmail(): string {
    const savedUser = this.getSavedUser();
    return savedUser ? savedUser['userEmail'] : '';
  }

  getUsersId(): number {
    const savedUser = this.getSavedUser();
    return savedUser ? savedUser['id'] : -100 ;
  }

  addUser(user:RegisterUser){
    return this._httpClient.post(this.serverEndpoint+"/add", user);
  }

  wipeUserData() {
    const storage = sessionStorage ? sessionStorage : localStorage;
    storage.removeItem(this.USER_KEY);
  }

  /**Remaning to connect to component */
  updateAdminPassword(updatedCredentails: NewCredentials) {
    return this._httpClient.put(
      this.serverEndpoint + '/update-pass',
      updatedCredentails
    );
  }

  getAllUsers() {
    return this._httpClient.get(this.serverEndpoint + '/all');
  }

  searchUserWith(credential: string): Observable<any> {
    return this._httpClient.get(
      this.serverEndpoint + '/search-for/' + credential.toString()
    );
  }
}
