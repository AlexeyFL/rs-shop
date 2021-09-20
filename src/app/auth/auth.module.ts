import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [AuthComponent],
})
export class AuthModule {}
