import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemUpload } from 'src/app/shared/models/item-upload';
import { NewItemService } from '../../services/new-item.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  newItemForm!: FormGroup;
  newItem: ItemUpload = new ItemUpload();
  images = [] as File[];
  imagesPreview:string[] = [];
  isSubmitted: boolean = false;
  tags: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private newItemService: NewItemService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.newItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      origin: [['']]
    });
  }

  addTag() {
    const inputTag = (<HTMLInputElement>document.getElementById('addTag')).value;
    this.tags.push(inputTag);
  }

  removeTag() {
    this.tags.pop();
  }

  removeImage() {
    this.images.pop();
    this.imagesPreview.pop();
  }

  showImage(event: any) {
    if (event.target.files) {
      for (let index = 0; (index < event.target.files.length) && this.images.length < 4; index++) {
        this.images.push(event.target.files[index]);
        let reader = new FileReader();
        reader.onload = (e: any) => this.imagesPreview.push(e.target.result);
        reader.readAsDataURL(event.target.files[index]);
      }
    }
  }

  get fc() {
    return this.newItemForm.controls;
  }

  uploadItem() {
    this.isSubmitted = true;
    if (this.newItemForm.invalid || this.images.length === 0) {
      this.toastrService.warning('Моля попълнете всички полета', 'Невалидни данни');
      return;
    }

    const form = new FormData();
    this.images.forEach(image => {
      form.append('images', image);
    });
    form.set('name', this.fc['name'].value);
    form.set('category', this.fc['category'].value);
    form.set('description', this.fc['description'].value);
    form.set('price', this.fc['price'].value);
    form.set('origin', this.fc['origin'].value);
    this.tags.forEach(tag => {
      form.append('tags', tag);
    })
    this.newItemService.create(form).subscribe({
      next: () => {
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Няма продукти');
      }
    });
  }
}
