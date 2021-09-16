import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { Good, GoodByCategoryId } from '../../models/response-models';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  slides: GoodByCategoryId[] = [];

  carouselCategory: string = 'tablets';

  carouselSubCategory: string = 'tablets';

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
    public databaseService: DatabaseService,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.databaseService.getGoodsByCategoryId(this.carouselCategory, 0, 6);
    this.databaseService.getGoodsByCategory(this.carouselCategory);
    this.databaseService.customCategoryGoods$.subscribe((data) => {
      console.log(data);
    });
  }

  goToGood(id: string, categoryId: string, subCategoryId: string) {
    this.router.navigate([categoryId, subCategoryId, id]);
  }
}
