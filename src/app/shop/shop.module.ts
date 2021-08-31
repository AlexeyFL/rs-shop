import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLocationComponent } from './components/user-location/user-location.component';

@NgModule({
  declarations: [UserLocationComponent],
  imports: [CommonModule],
  exports: [UserLocationComponent],
})
export class ShopModule {}
