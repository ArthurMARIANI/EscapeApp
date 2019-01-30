import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from '../alerts/services/alert.service';
import { TeamsService } from './teams.service';
import { Team } from './team';

@Component({
  selector: 'app-display-players',
  templateUrl: 'player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

  @Input() team: Team ;
  @Input() longList: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
