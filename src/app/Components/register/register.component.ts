import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/Models/register-user';
import { User } from 'src/app/Models/user-details';
import { UserAuthenticationService } from 'src/app/Services/user-authentication.service';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
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

  submitForRegister() {
    if (this.registerForm.valid) {
      const { userName, userEmail, userPassword } = this.registerForm.controls;

      const newUserToRegister = new RegisterUser(
        userName.value,
        userEmail.value,
        false,
        userPassword.value
      );
      this._userdataService.addUser(newUserToRegister).subscribe(
        (response: any) => {
          if (response) {
            alert('Registered successfully');
            this._router.navigate(['/']);
          } else {
            alert('Unable to register !!');
          }
        },
        (err) => {
          alert('Unable to register !!');
        }
      );
    } else {
      alert('All feilds are required!!');
    }
  }
}
