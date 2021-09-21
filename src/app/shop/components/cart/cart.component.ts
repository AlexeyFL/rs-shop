import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  currentDate!: string;

  showOrderForm: boolean = false;

  showSuccessMessage: boolean = false;

  deliveryDate: string = 'Сегодня';

  cartOrderSuccess: {
    userName: string;
    address: string;
    delivery: string;
    phone: string;
    time: string;
  } = {
    userName: '',
    address: '',
    delivery: '',
    phone: '',
    time: '',
  };

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // this.cartService.cartGoods$.subscribe((data) => {});

    this.currentDate = new Date().toISOString().substring(0, 10);
    this.cartService.getUserInfo();
  }

  navigateTo(category: string, subCategory: string, id: string) {
    this.router.navigate(['/', category, subCategory, id]);
  }

  removeGood(id: string) {
    this.cartService.removeGood(id);
  }

  onSubmit(form: NgForm) {
    this.showSuccessMessage = true;
    this.cartOrderSuccess = {
      address: form.value.address,
      delivery: form.value.delivery,
      phone: form.value.phone,
      time: form.value.time,
      userName: form.value.userName,
    };
    form.reset();
  }
}
