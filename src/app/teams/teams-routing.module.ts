import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { CreateTeamComponent } from './create-team.component';
import { DisplayTeamComponent } from './display-team.component';
import { JoinTeamComponent } from './join-team.component';

const routes: Routes = [
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/:id', component: DisplayTeamComponent, pathMatch: 'full' },
  { path: 'team/create', component: CreateTeamComponent, pathMatch: 'full' },
  { path: 'teams/join/:id', component: JoinTeamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule {

}
