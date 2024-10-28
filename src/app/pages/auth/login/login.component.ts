import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ScrumInputComponent } from '../../../shared/custom/scrum-input/scrum-input.component';
import { StorageService } from '../../../core/service/storage.service';
import { Routes } from '../../../core/constants/route.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule,ScrumInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  routes=Routes
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authSevice: AuthService,
    private router: Router,
    private tostr: ToastrService,
    private storageService:StorageService
  ) {}
  ngOnInit() {
    this.formInit();
  }

  formInit() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signIn() {
    const data = this.loginForm.value;
    this.authSevice.login(data).subscribe({
      next: (response: any) => {
        this.router.navigate([this.routes.Dashbaord]);
        this.storageService.setLocalStorageItem('currentUser',data.email)
      },
      error: (error: any) => {
        this.tostr.error(error, 'Error');
      },
    });
  }
}
