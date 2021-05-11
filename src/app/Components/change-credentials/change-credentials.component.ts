import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewCredentials } from 'src/app/Models/update-password';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.scss'],
})
export class ChangeCredentialsComponent implements OnInit {
  updatePasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    newPasswordConfirm: new FormControl('', [Validators.required]),
  });
  constructor(
    private _userdataService: UserdataService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (!this._userdataService.isLoggedIn()) this._router.navigate(['/']);
  }

  updatePassword() {
    if (this.updatePasswordForm.valid) {
      const {
        newPassword,
        newPasswordConfirm,
      } = this.updatePasswordForm.controls;

      if (newPassword.value === newPasswordConfirm.value) {
        this._userdataService
          .updateAdminPassword(
            new NewCredentials(
              this._userdataService.getUsersId(),
              newPassword.value
            )
          )
          .subscribe(
            (response: any) => {
              if (response) {
                alert('Password updated successfully');
                this._userdataService.wipeUserData();
                this._router.navigate(['/dashboard']);
              } else {
                alert('Error! unable to update password');
              }
            },
            (err) => alert('Error! unable to update password')
          );
      } else {
        alert('Error! passwords do not match');
      }
    }
  }
}
