import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../redux/state';
import { DatabaseService } from '../../../shop/services/database.service';
import { getGoods } from '../../../redux/actions/actions';
import { Goods } from '../../../shop/models/response-models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  goods!: Observable<Goods>;

  constructor(
    private databaseService: DatabaseService,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.store.dispatch(getGoods({ amount: 3 }));
    // this.databaseService.getAllGoods();
  }
}
