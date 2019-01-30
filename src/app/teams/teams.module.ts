import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TeamsComponent } from './teams.component';

import { TeamsRoutingModule } from './teams-routing.module';
import { DisplayTeamComponent } from './display-team.component';
import { CreateTeamComponent } from './create-team.component';
import { JoinTeamComponent } from './join-team.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    TeamsRoutingModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBXPRw7pLJD4mPbptN4-xN7ENQWhYfKIVI'
    })
  ],
  declarations: [
    CreateTeamComponent,
    DisplayTeamComponent,
    TeamsComponent,
    JoinTeamComponent,
  ],
})
export class TeamsModule { }
