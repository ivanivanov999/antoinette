import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewCategoryService } from '../../services/new-category.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {
  newCategoryForm!: FormGroup;
  image = {} as File;
  imagePreview: string = '';
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private newCategoryService: NewCategoryService) {}

  ngOnInit(): void {
    this.newCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      rank: [1]
    });
  }

  removeImage() {
    this.image = {} as File;
    this.imagePreview = '';
  }

  showImage(event: any) {
    if (event.target.files[0]) {
      this.image = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e: any) => this.imagePreview = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  get fc() {
    return this.newCategoryForm.controls;
  }

  uploadCategory() {
    this.isSubmitted = true;
    if (this.newCategoryForm.invalid || this.image == null) {
      this.toastrService.warning('Моля попълнете всички задължителни полета', 'Невалидни данни');
      return;
    }

    const form = new FormData();
    form.append('image', this.image);
    form.set('name', this.fc['name'].value);
    form.set('rank', this.fc['rank'].value);
    this.newCategoryService.create(form).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Грешка със сървъра');
      }
    });
  }
}
