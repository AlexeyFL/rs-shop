import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  constructor(
    public favoriteService: FavoriteService,
    public cartService: CartService,
    private router: Router,
  ) {}

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit() {
    this.favoriteService.getfavoriteGoods();
  }

  addToCart(goodId: string) {
    this.cartService.addToCart(goodId);
  }

  removeFromFavorite(id: string) {
    this.favoriteService.removeGood(id);
  }

  navigateTo(categoryId: string, subCategoryId: string, id: string) {
    this.router.navigate(['/', categoryId, subCategoryId, id]);
  }
}
