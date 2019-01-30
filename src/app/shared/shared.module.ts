import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Pipes */
import { ToMoneySymbolPipe } from '../_pipes/to_money_symbol.pipe';

/* General App Components */
import { AlertComponent } from './alerts/components/alert.component';
import { AlertService } from './alerts/services/alert.service';
import { PageNotFoundComponent } from './404/not-found.component';

/* Team App Components */
import { TeamsComponent } from './teams/teams.component';
import { TeamsService } from './teams/teams.service';
import { PlayerComponent } from './teams/player.component';

/* User App Components */
import { UserService } from './user/user.service';

/* EscapeGame App Components */
import { EscapegameComponent } from './escapegame/escapegame.component';
import { EscapegameService } from './escapegame/escapegame.service';

/* Avatar App Components */
import { AvatarService } from './avatar/avatar.service';

/* Room App Components */
import { RoomComponent } from './room/room.component';
import { RoomPriceComponent } from './room/room-price.component';
import { RoomService } from './room/room.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],

  declarations: [
    ToMoneySymbolPipe,
    AlertComponent,
    PageNotFoundComponent,
    TeamsComponent,
    EscapegameComponent,
    RoomComponent,
    RoomPriceComponent,
    PlayerComponent,
  ],

  exports: [
    AlertComponent,
    PageNotFoundComponent,
    TeamsComponent,
    EscapegameComponent,
    RoomComponent,
    RoomPriceComponent,
    PlayerComponent,
  ],

  providers: [
    AlertService,
    TeamsService,
    EscapegameService,
    RoomService,
    UserService,
    AvatarService
  ]
})
export class SharedModule { }
