import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from './Services/user-authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'sporty-shoes';

  constructor() {}

  ngOnInit() {
  }
}
