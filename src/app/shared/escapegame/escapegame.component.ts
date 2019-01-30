import { Component, OnInit, Input } from '@angular/core';
import { EscapegameService } from './escapegame.service';
import { Escapegame } from './escapegame'

@Component({
  selector: 'app-escapegame',
  templateUrl: 'escapegame.component.html',
  styleUrls: ['./escapegame.component.scss']
})
export class EscapegameComponent implements OnInit {

  @Input() limited: number;
  escapegames: Escapegame[];
  escapegames_displayed: Escapegame[];

  constructor(
    private escapegameService: EscapegameService
  ) {}
  ngOnInit() {
    this.getEscapegames();
  }

  async getEscapegames() {
    this.handleResult(await this.escapegameService.getEscapegames());
  }
    handleResult(escapegames) {
      this.escapegames = escapegames;
      if (this.limited) {
        this.escapegames_displayed = this.escapegames.slice(0, this.limited);
      } else {
        this.escapegames_displayed = this.escapegames;
      }
  }
}
