import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/user-details';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private _userAuthService: UserAuthenticationService,
    private _userdataService: UserdataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (this._userdataService.isLoggedIn())
      this._router.navigate(['/dashboard']);
  }

  submitForLogin() {
    if (this.loginForm.valid) {
      this._userAuthService
        .authenticate(
          this.loginForm.controls.userEmail.value,
          this.loginForm.controls.userPassword.value
        )
        .subscribe((response: any) => {
          console.log(response);
          if (response) {

            console.log(response)
            const userLogedIn = new User(
              response['username'],
              response['email'],
              response['admin']
            );
            userLogedIn.setUserId(response["id"]);
            this._userdataService.saveUser(userLogedIn);
            this._router.navigate(['/dashboard']);
          } else {
            alert('Wrong email or password');
          }
        });
    } else {
      alert('Unable to login , all fields are required');
    }
  }
}
