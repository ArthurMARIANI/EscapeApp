import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { DisplayUserComponent } from './display-user.component';

@NgModule({
  imports:      [
    SharedModule,
    FormsModule,
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DisplayUserComponent
  ],
  exports: [
  ]
})
export class UsersModule {}
