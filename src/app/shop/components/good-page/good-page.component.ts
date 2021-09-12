import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Good } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-good-page',
  templateUrl: './good-page.component.html',
  styleUrls: ['./good-page.component.scss'],
})
export class GoodPageComponent implements OnInit {
  paramsSubscription!: Subscription;

  goodSubscription!: Subscription;

  good!: Good;

  constructor(
    private databaseService: DatabaseService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.params
      .pipe(
        map((params) => {
          this.databaseService.getGoodById(params.goodId);
        }),
      )
      .subscribe();

    this.goodSubscription = this.databaseService.good$.subscribe((data) => {
      if (data) {
        this.good = data;
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.goodSubscription.unsubscribe();
  }
}
