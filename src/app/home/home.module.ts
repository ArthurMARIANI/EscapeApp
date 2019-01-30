import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [SharedModule, FormsModule, CommonModule, HomeRoutingModule],
  declarations: [HomeComponent],
  exports: []
})
export class HomeModule {}
