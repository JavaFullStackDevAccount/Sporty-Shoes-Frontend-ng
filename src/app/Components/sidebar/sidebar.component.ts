import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input("optionsToRender") optionsToRender:any;

  @Input("userEmail") email:any;

  displayAddCategory:boolean = false;

  display = false;

  avaliableOptions:any=[];

  constructor(private _userDataService: UserdataService, private _router: Router) { }

  ngOnInit(): void {

    this.avaliableOptions = [...this.optionsToRender]
  }

  logout(){
    this._userDataService.wipeUserData()
    this._router.navigate(["/"])
  }

}
