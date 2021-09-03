import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { HoverDirective } from './directives/hover.directive';

@NgModule({
  declarations: [HoverDirective],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, HoverDirective],
})
export class SharedModule {}
