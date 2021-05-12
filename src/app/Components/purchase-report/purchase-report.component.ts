import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { PurchaseService } from 'src/app/Services/purchase.service';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-purchase-report',
  templateUrl: './purchase-report.component.html',
  styleUrls: ['./purchase-report.component.scss'],
})
export class PurchaseReportComponent implements OnInit {
  ordersList: any = [];

  orderListBackup: any = [];

  category: any;

  totalAmount: number = 0;

  totalPurchases: number = 0;

  filterForm: FormGroup = new FormGroup({
    categoryForFiltering: new FormControl('', [Validators.required]),
    dateForFiltering: new FormControl('', [Validators.required]),
  });

  constructor(
    private _purchaseService: PurchaseService,
    private _userDataService: UserdataService,
    private _router: Router,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    if (!this._userDataService.isLoggedIn()) this._router.navigate(['/']);

    
    this._categoryService.getAllCategories().subscribe((response: any) => {
      if (response) {
        this.category = [...response];
      }
    });

    this._purchaseService.getAllOrders().subscribe((response: any) => {
      //console.log(response);
      if (response) {
        this.ordersList = [...response];
        this.orderListBackup = [...response];
        this.setTotalAmount();
        this.setTotalPurchases();
      }
    });
  }

  setTotalAmount() {
    this.totalAmount = this.ordersList
      .map((order: any) => order['products']['price'])
      .reduce((a: number, b: number) => a + b);
  }

  setTotalPurchases() {
    this.totalPurchases = this.ordersList.length;
  }

  private getFormattedDate(date: Date) {
    const formttedDate =
      date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

    return formttedDate;
  }

  filterByDate(dateToFilterFor: Date) {
    if (this.ordersList) {
      const parsedDateToFilterFor = new Date(dateToFilterFor);
      const dateStringForFilteredParsedDate = this.getFormattedDate(
        parsedDateToFilterFor
      );
      this.ordersList = [
        ...this.ordersList.filter(
          (order: any) =>
            dateStringForFilteredParsedDate ===
            this.getFormattedDate(new Date(order['purchaseDate']))
        ),
      ];
      this.setTotalAmount();
      this.setTotalPurchases();
    }
  }

  filterByCategory(categoryIdToFilterFor: number) {
    if (this.ordersList) {
      this.ordersList = [
        ...this.ordersList.filter(
          (order: any) =>
            order['products']['category']['id'] === categoryIdToFilterFor
        ),
      ];
      this.setTotalAmount();
      this.setTotalPurchases();
    }
  }

  filterFormSubmit() {
    if (this.filterForm.valid) {
      this.filterByCategory(
        this.filterForm.controls.categoryForFiltering.value['id']
      );
      this.filterByDate(this.filterForm.controls.dateForFiltering.value);

      this.setTotalAmount();
      this.setTotalPurchases();
    } else {
      if (this.filterForm.controls.dateForFiltering.valid)
        this.filterByDate(this.filterForm.controls.dateForFiltering.value);
      else if (this.filterForm.controls.categoryForFiltering.valid)
        this.filterByCategory(
          this.filterForm.controls.categoryForFiltering.value['id']
        );
      else alert('Select atleast one option to apply filter !!!');
    }
  }
}
