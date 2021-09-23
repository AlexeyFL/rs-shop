import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shop/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {
  showInfo: boolean = false;

  showLoginForm: boolean = false;

  showAuthForm: boolean = false;

  authorized: boolean = false;

  userName!: string;

  unsubscribeLoginError!: Subscription;

  showLoginError: boolean = false;

  constructor(private authService: AuthService) {}

  onShowInfo() {
    this.showInfo = !this.showInfo;
  }

  onShowLoginForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  onShowAuthForm() {
    this.showAuthForm = !this.showAuthForm;
  }

  onCloseLoginForm() {
    this.showLoginForm = false;
    this.showAuthForm = false;
  }

  loginUser(form: NgForm) {
    this.authService.loginUser(form.value);
    this.unsubscribeLoginError = this.authService.loginError$.subscribe(
      (err) => {
        if (!err) {
          this.authorized = true;
        } else {
          this.showLoginError = true;
          this.authorized = false;
        }
      },
    );
    this.authorized = true;
    this.showLoginError = false;
    this.showLoginForm = false;
    this.userName = form.value.login;
    form.reset();
  }

  authorization(form: NgForm) {
    this.authService.registerUser(form.value);
    this.showAuthForm = false;
    this.authorized = true;
    this.userName = form.value.login;
    this.showLoginError = false;
    form.reset();
  }

  logout() {
    localStorage.removeItem('token');
    this.authorized = false;
    this.userName = '';
  }

  ngOnDestroy() {
    this.unsubscribeLoginError.unsubscribe();
  }
}
