import { Component } from '@angular/core';
import { ScrumInputComponent } from '../../../shared/custom/scrum-input/scrum-input.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { EncryptService } from '../../../core/service/encrypt.service';
import { StorageService } from '../../../core/service/storage.service';
import { AuthService } from '../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Routes } from '../../../core/constants/route.constants';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ScrumInputComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup;
  routes=Routes
  constructor(
    private fb: FormBuilder,
    private cryptoService: EncryptService,
    private authSevice: AuthService,
    private tostrService: ToastrService,
    private router:Router
  ) {}
  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.signupForm = this.fb.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  trimFormValues() {
    const trimmedValues: any = {};
    Object.keys(this.signupForm.controls).forEach((key) => {
      const control = this.signupForm.get(key);
      if (control && typeof control.value === 'string') {
        trimmedValues[key] = control.value.trim();
      }
    });
    this.signupForm.patchValue(trimmedValues);
  }

  signUp() {
    if (this.signupForm.invalid) {
      return;
    }

    this.trimFormValues();
    const formValues = this.signupForm.value;
    const hashedPassword = this.cryptoService.encryptPassword(formValues.password);
    const secureFormValues = {
      ...formValues,
      password: hashedPassword,
    };

    this.authSevice.signUp(secureFormValues).subscribe({
      next: (response) => {
        this.tostrService.success('User created successfully', 'Success');
        this.router.navigate([this.routes.Loging])
      },
      error: (error: any) => {
        this.tostrService.error(error, 'Error');
      },
    });
  }
}
