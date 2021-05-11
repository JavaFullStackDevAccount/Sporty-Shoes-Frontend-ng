import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Models/category-details';
import { Product } from 'src/app/Models/product-details';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductsService } from 'src/app/Services/products.service';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  updateProductFrom: FormGroup = new FormGroup({
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

  private productId: number = -100;

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductsService,
    private _userdataService: UserdataService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this._userdataService.isLoggedIn()) this._router.navigate(['/']);

    try {
      this._activatedRouter.params.subscribe((params: any) => {
        console.log(params)
        if (params['id']) {
          const id = parseInt(params['id']);
          if (id) {
            this._categoryService
              .getAllCategories()
              .subscribe((response: any) => {
                if (response) this.categories = [...response];
              });
            this.setFormDefaultValues(id);
          } else {
            this.rollBack();
          }
        }
      });
    } catch (error) {
      this.rollBack();
    }
  }

  setForm(productData: any) {
    /**
     * category: {id: 1, name: "Category 111", picture: "na"}
        description: "product 1 desc"
        id: 1
        name: "product 1"
        picture1: "https://cdn.vox-cdn.com/thumbor/S4ka2uwWyJ9rHJFDwVa8BQCqMHA=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22406771/Exbfpl2WgAAQkl8_resized.jpeg"
        price: 1200
     */
    console.clear();

    this.updateProductFrom.patchValue({
      productDescription: productData['description'],
      productCategory: productData['category'],
      productPrice: productData['price'],
      productImageUrl: productData['picture1'],
      productTitle: productData['name'],
    });

    this.productId = productData['id'];

    console.log(productData);
  }

  setFormDefaultValues(productId: number) {
    this._productService
      .getProductById(productId)
      .subscribe((response: any) => {
        if (response) {
          this.setForm(response);
        } else {
          this.rollBack();
        }
      });
  }

  updateProductSubmitted() {
    if (this.updateProductFrom.valid) {
      const {
        productDescription,
        productCategory,
        productPrice,
        productImageUrl,
        productTitle,
      } = this.updateProductFrom.controls;

      const updatedProduct = new Product(
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
      console.log(updatedProduct);
      this._productService
        .updateProduct(this.productId, updatedProduct)
        .subscribe(
          (response: any) => {
            if (response) {
              alert('Product updated');
            }
            this.rollBack(false);
          },
          (err) => {
            alert('Unable to update product');
            this.rollBack();
          }
        );
    }
  }

  rollBack(showAlert:boolean = true) {
    if(showAlert)alert('Problem getting the product');
    this._router.navigate(['/dashboard']);
  }
}
