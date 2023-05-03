import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  registerIsSubmitted: boolean = false;

  returnUrl = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required, Validators.minLength(10)]]
    },{
      validators: PasswordsMatchValidator('password', 'confirmPassword')
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get registerFc() {
    return this.registerForm.controls;
  }

  registerSubmit() {
    this.registerIsSubmitted = true;
    if (this.registerForm.invalid) return;

    this.userService.register({
      name: this.registerFc['name'].value,
      email: this.registerFc['email'].value,
      password: this.registerFc['password'].value,
      confirmPassword: this.registerFc['confirmPassword'].value,
      address: this.registerFc['address'].value,
      phone: this.registerFc['phone'].value
    }).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
