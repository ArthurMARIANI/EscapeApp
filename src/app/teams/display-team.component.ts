import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../shared/teams/teams.service';
import { Escapegame } from '../shared/escapegame/escapegame';
import { Team } from '../shared/teams/team';

@Component({
  templateUrl: 'display-team.component.html',
  styleUrls: ['team.scss']
})
export class DisplayTeamComponent {

  map: google.maps.Map;
  team: Team;
  escapegame: Escapegame;

  constructor(
    private activatedRoute: ActivatedRoute,
    private teamService: TeamsService,
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe( async params => {
      this.team = await this.teamService.getTeam(params.id);
    });
  }
}
