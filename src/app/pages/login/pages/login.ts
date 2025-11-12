import { Component, inject, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { GOOGLECLIENTE_ID } from '../../../shared/utils/constants';
import { jwtDecode } from 'jwt-decode';
import { LoginStore } from '../services/login-store';
declare const google: any;
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FontAwesomeModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private loginStore = inject(LoginStore);
  faGoogle = faGoogle;
  formBuilder = inject(FormBuilder);
  form: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor() {
    library.add(faGoogle);
  }

  ngOnInit() {
    const initGoogle = () => {
      google.accounts.id.initialize({
        client_id: GOOGLECLIENTE_ID,
        callback: (response: any) => {
          this.handleGoogleLogin(response);
        },
      });
    };

    if (typeof google !== 'undefined' && google.accounts) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (typeof google !== 'undefined' && google.accounts) {
          clearInterval(interval);
          initGoogle();
        }
      }, 300);
    }
  }

  loginWithGoogle() {
    google.accounts.id.prompt();
  }

  handleGoogleLogin(response: any): void {
    const token = response.credential;
    const userInfo: any = jwtDecode(token);
    console.log('Datos usuario Google:', userInfo);

    this.loginStore.googleLogin(token).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  loginWithEmail() {
    this.loginStore.login(this.form.value).subscribe({
      next: (resp: any) => {
        console.log(resp);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
