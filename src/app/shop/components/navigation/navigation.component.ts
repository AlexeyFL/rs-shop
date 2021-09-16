import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  showCategoriesPopup!: boolean;

  constructor(
    private router: Router,
    public cartService: CartService,
    private categoryService: CategoryService,
  ) {}

  showCategories() {
    this.router.navigate(['categories']);
  }

  showHideCategoriesPopup() {
    this.showCategoriesPopup = !this.showCategoriesPopup;
    this.categoryService.showHideCategoryPopup(this.showCategoriesPopup);
  }
}
