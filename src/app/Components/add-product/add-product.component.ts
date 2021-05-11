import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category-details';
import { Product } from 'src/app/Models/product-details';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addNewProductForm: FormGroup = new FormGroup({
    productTitle: new FormControl('', Validators.required),
    productImageUrl: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.min(0),
    ]),
    productCategory: new FormControl('', Validators.required),
    productDescription: new FormControl('', Validators.required),
  });

  categories: any;

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductsService,
    private _userdataService: UserdataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!this._userdataService.isLoggedIn()) this._router.navigate(['/']);

    this._categoryService.getAllCategories().subscribe((response: any) => {
      if (response) this.categories = [...response];
    });
  }

  newproductSubmittedToAdd() {
    if (this.addNewProductForm.valid) {
      const {
        productDescription,
        productCategory,
        productPrice,
        productImageUrl,
        productTitle,
      } = this.addNewProductForm.controls;

      const newProductToAdd = new Product(
        productTitle.value,
        productDescription.value,
        productPrice.value,
        productImageUrl.value,
        new Category(
          productCategory.value['name'],
          productCategory.value['id'],
          'na'
        )
      );
      console.log(newProductToAdd);
      this._productService.addNewProduct(newProductToAdd).subscribe(
        (response: any) => {
          if (response) {
            alert('Product added');
          }
        },
        (err) => alert('Unable to add product')
      );
    }
  }
}
