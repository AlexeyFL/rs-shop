import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { ShopModule } from '../shop/shop.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainComponent],
  imports: [CommonModule, ShopModule],
  exports: [HeaderComponent, FooterComponent, MainComponent],
})
export class CoreModule {}
