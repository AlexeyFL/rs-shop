import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Good } from '../../models/response-models';
import { CartService } from '../../services/cart.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrls: ['./goods-page.component.scss'],
})
export class GoodsPageComponent implements OnInit, OnDestroy {
  isAsc: boolean = true;

  sortByValue: string = '';

  @Input() goods!: Good[];

  categoryUnsubscribe!: Subscription;

  goodUnsubscribe!: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.categoryUnsubscribe =
      this.databaseService.currentCategory$.subscribe();
  }

  counter(i: number) {
    return new Array(i);
  }

  sortBy(value: string) {
    this.sortByValue = value;
    this.isAsc = !this.isAsc;
  }

  addToCart(good: string) {
    this.cartService.cart.push(good);

    this.databaseService.getAllGoods(3);

    this.cartService.addToCart(this.cartService.cart);
  }

  ngOnDestroy() {
    this.categoryUnsubscribe.unsubscribe();
  }
}
