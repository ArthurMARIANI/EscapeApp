import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EscapegamesComponent } from './escapegames.component';
import { DisplayEscapegameComponent } from './display-escapegame.component';

const routes: Routes = [
  { path: 'escapegames', component: EscapegamesComponent },
  { path: 'escapegames/:id', component: DisplayEscapegameComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscapegamesRoutingModule {}
