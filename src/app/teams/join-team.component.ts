import { Component, Input } from '@angular/core';
import { Team } from '../shared/teams/team';

@Component({
  templateUrl: 'join-team.component.html'
})

export class JoinTeamComponent {
  @Input('team') team: Team;

  constructor() {
  }

}
