import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayUserComponent } from './display-user.component';

const routes: Routes = [
  { path: 'user/me', component: DisplayUserComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
