import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayRoomComponent } from './display-room.component';

const routes: Routes = [
  { path: 'rooms/:id', component: DisplayRoomComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule {}
