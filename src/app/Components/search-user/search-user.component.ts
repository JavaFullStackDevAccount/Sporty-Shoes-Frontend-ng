import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
  usersList: any[] = [];

  textToSearch!: string;

  constructor(
    private _userdataService: UserdataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!this._userdataService.isLoggedIn()) this._router.navigate(['/']);

    this._userdataService.getAllUsers().subscribe((response: any) => {
      if (response) {
        this.usersList = [...response];
      }
      console.log(response);
    });
  }

  search() {
    if (this.textToSearch) {
      console.log(this.textToSearch);
      if (this.textToSearch.replace(' ', '').toUpperCase() !== 'NULL') {
        this._userdataService
          .searchUserWith(this.textToSearch)
          .subscribe((response: any) => {
            if (response) {
              this.usersList = [...response];
              console.log(response);
            }
          });
      }
    }
  }
}
