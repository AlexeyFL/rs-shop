import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Good } from '../../models/response-models';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-goods-page',
  templateUrl: './goods-page.component.html',
  styleUrls: ['./goods-page.component.scss'],
})
export class GoodsPageComponent implements OnInit, OnDestroy {
  @Input() goods!: Good[];

  categoryUnsubscribe!: Subscription;

  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    this.categoryUnsubscribe = this.databaseService.currentCategory$.subscribe(
      (data) => {
        console.log('app-goods-page', data);
      },
    );
  }

  ngOnDestroy() {
    this.categoryUnsubscribe.unsubscribe();
  }
}
