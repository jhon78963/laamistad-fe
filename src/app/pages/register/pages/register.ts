import { Component, inject } from '@angular/core';
import {
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterStore } from '../services/register-store';

@Component({
  selector: 'app-register',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private registerStore = inject(RegisterStore);
  formBuilder = inject(FormBuilder);
  passwordMismatch = false;
  apiError: string | null = null;

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    password_confirmation: ['', Validators.required],
  });

  register() {
    this.registerStore.register(this.form.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
