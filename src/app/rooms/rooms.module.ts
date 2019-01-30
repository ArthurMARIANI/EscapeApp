import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RoomsRoutingModule } from './rooms-routing.module';
import { DisplayRoomComponent } from './display-room.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    CommonModule,
    RoomsRoutingModule
  ],
  declarations: [
    DisplayRoomComponent
  ],
  exports: [
    DisplayRoomComponent
  ]
})
export class RoomsModule {}
