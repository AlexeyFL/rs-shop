import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Good, GoodByCategoryId } from '../../models/response-models';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { DatabaseService } from '../../services/database.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrls: ['./goods-page.component.scss'],
})
export class GoodsPageComponent implements OnInit, OnDestroy {
  isAsc: boolean = true;

  sortByValue: string = '';

  @Input() goods!: Good[] | null | GoodByCategoryId[];

  categoryUnsubscribe!: Subscription;

  goodUnsubscribe!: Subscription;

  constructor(
    private databaseService: DatabaseService,
    private cartService: CartService,
    private categoryService: CategoryService,
    private favoriteService: FavoriteService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.categoryUnsubscribe = this.databaseService.currentCategory$.subscribe();
  }

  counter(i: number) {
    return new Array(i);
  }

  sortBy(value: string) {
    this.sortByValue = value;
    this.isAsc = !this.isAsc;
  }

  navigateTo(categoryId: string, subcategoryId: string, goodId: string) {
    if (categoryId && subcategoryId) {
      this.router.navigate(['/', categoryId, subcategoryId, goodId]);
    } else {
      this.router.navigate([goodId], { relativeTo: this.route });
    }
  }

  addToCart(goodId: string) {
    this.cartService.addToCart(goodId);
  }

  addToFavorite(goodId: string) {
    this.favoriteService.addToFavorite(goodId);
  }

  ngOnDestroy() {
    this.categoryUnsubscribe.unsubscribe();
  }
}
