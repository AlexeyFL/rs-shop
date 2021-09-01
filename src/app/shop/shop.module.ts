import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserLocationComponent } from './components/user-location/user-location.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [UserLocationComponent],
  imports: [CommonModule, SharedModule, FormsModule],
  exports: [UserLocationComponent],
})
export class ShopModule {}
