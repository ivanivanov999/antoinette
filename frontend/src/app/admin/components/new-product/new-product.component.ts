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
  image = {} as File;
  imagesPreview:string[] = [''];
  isSubmitted: boolean = false;

  @ViewChild('fileInput', { static: false}) fileInput!: ElementRef;

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
      price: [null, Validators.required]
    });
  }

  showImage(event: any) {
    if (event.target.files) {
      this.imagesPreview = [];
      for (let index = 0; index < event.target.files.length; index++) {
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
    if (this.newItemForm.invalid) {
      this.toastrService.warning('Моля попълнете всички полета', 'Невалидни данни');
      return;
    }

    const form = new FormData();
    const imageBlob = this.fileInput.nativeElement.files[0];
    form.append('images', imageBlob);
    form.set('name', this.fc['name'].value);
    form.set('category', this.fc['category'].value);
    form.set('description', this.fc['description'].value);
    form.set('price', this.fc['price'].value);

    this.newItemService.create(form).subscribe({
      next: () => {
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Няма продукти');
      }
    });
  }
}
