import { Component, OnInit } from '@angular/core';
import SwiperCore, {
  SwiperOptions,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { Good } from '../../models/response-models';

SwiperCore.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  slides: Good[] = [];

  carouselCategory: string = 'appliances';

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
    this.databaseService.getGoodsByCategoryId(this.carouselCategory, 0, 6);
  }

  goToGood(id: string) {
    this.router.navigate([`${this.carouselCategory}/${id}`]);
  }
}
