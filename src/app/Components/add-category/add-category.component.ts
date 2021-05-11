import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/Models/category-details';
import { CategoryService } from 'src/app/Services/category.service';
import { UserdataService } from 'src/app/Services/userdata.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
  });

  constructor(
    private _categoryService: CategoryService,
    private _userdataService: UserdataService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (!this._userdataService.isLoggedIn()) this._router.navigate(['/']);
  }

  submitNewCategoryToAdd() {
    if (this.addCategoryForm.valid) {
      const newCategoryToAdd: Category = new Category(
        this.addCategoryForm.controls.categoryName.value
      );

      this._categoryService
        .addNewCategory(newCategoryToAdd)
        .subscribe((response) => {
          if (response) alert('Category Added');
        });
    } else {
      alert('All fields are required');
    }
  }
}

/**
 * 	

	private Integer id;

	private String name;


	private String picture;


	private List<Product> products;
 */
