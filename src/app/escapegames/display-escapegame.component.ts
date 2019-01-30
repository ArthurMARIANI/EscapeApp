import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EscapegameService } from '../shared/escapegame/escapegame.service';
import { Escapegame } from '../shared/escapegame/escapegame';

@Component({
  templateUrl: 'display-escapegame.component.html',
  styleUrls: ['escapegame.scss']
})
export class DisplayEscapegameComponent {
  map: google.maps.Map;
  escapegame: Escapegame;

  constructor(
    private activatedRoute: ActivatedRoute,
    private escapegameService: EscapegameService,
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      await this.getEscapegame(params.id);
    });
  }

  async getEscapegame(escapegameId) {
    this.escapegame = await this.escapegameService.getEscapegame(escapegameId);
  }
}
