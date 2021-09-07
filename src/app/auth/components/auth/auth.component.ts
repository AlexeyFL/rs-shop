import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../shop/models/response-models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  showInfo: boolean = false;

  showLoginForm: boolean = false;

  authorized: boolean = false;

  userName!: string;

  ngOnInit() {}

  onShowInfo() {
    this.showInfo = !this.showInfo;
  }

  onShowLoginForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  onCloseLoginForm() {
    this.showLoginForm = false;
  }

  login(form: NgForm) {
    localStorage.setItem('user', JSON.stringify(form.value.userData));
    this.showLoginForm = false;
    this.authorized = true;
    this.userName = form.value.userData.username;
    form.reset();
  }

  logout() {
    localStorage.removeItem('user');
    this.authorized = false;
    this.userName = '';
  }
}
