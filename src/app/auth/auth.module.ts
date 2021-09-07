import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule],
  exports: [AuthComponent],
})
export class AuthModule {}
