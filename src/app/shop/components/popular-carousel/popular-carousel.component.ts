import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Good } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-popular-carousel',
  templateUrl: './popular-carousel.component.html',
  styleUrls: ['./popular-carousel.component.scss'],
})
export class PopularCarouselComponent implements OnInit, OnDestroy {
  slides!: Good[][];

  category: string = 'hobbies';

  subCategory: string = 'books';

  goodsUnsubscribe!: Subscription;

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    // autoplay: {
    //   delay: 2500,
    // },
    navigation: true,
    pagination: { clickable: true },
  };

  constructor(
    private databaseService: DatabaseService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.databaseService.getGoodsBySubCategoryId(
      this.category,
      this.subCategory,
      0,
      12,
    );

    this.goodsUnsubscribe = this.databaseService.subCategoryGoods$
      .pipe(
        map((goods) => {
          const slides = [];
          for (let i = 0, j = goods.length; i < j; i += 6) {
            slides.push(goods.slice(i, i + 6));
          }

          return slides;
        }),
      )
      .subscribe((data) => {
        this.slides = data;
      });
  }

  goToGood(id: string) {
    this.router.navigate([`${this.subCategory}/${id}`]);
  }

  ngOnDestroy() {
    this.goodsUnsubscribe.unsubscribe();
  }

  counter(i: number) {
    return new Array(i);
  }
}
