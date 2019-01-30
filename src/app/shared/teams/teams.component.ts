import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TeamsService } from './teams.service';
import { Team } from './team';
import { IFilter } from '../../teams/teams.component';

@Component({
  selector: 'app-teams',
  templateUrl: 'teams.component.html',
  styleUrls: ['./teams.component.scss']
})

export class TeamsComponent{

  @Input('limited') limited: number;
  @Input('teams') teams: Team[];


  constructor(private teamsService: TeamsService) {
  }

}
