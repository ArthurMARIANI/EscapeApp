import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../app.constants';
import { RoomService } from '../room/room.service';
import { Escapegame } from './escapegame';


@Injectable()
export class EscapegameService {
  apiEscapegame: string;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient,
    private configuration: Configuration,
    private roomService: RoomService) {
    this.apiEscapegame = configuration.escapegameApi;
    this.options = { headers: this.headers };
  }

  async getEscapegames() {
    const escapeGames = await this.http.get<Escapegame[]>(this.configuration.escapegameApi, this.options).toPromise();
    if (escapeGames) {
      for (const escapeGame of escapeGames) {
        for (let room of escapeGame.list_rooms) {
          room = await this.roomService.getRoom(room.id);
        }
      }
    }
    return escapeGames;
  }

  async getEscapegame(id) {
    const escapeGame = await this.http.get<Escapegame>(this.configuration.escapegameApi + '/' + id, this.options).toPromise();
    if (escapeGame) {
      let i = 0;
      for (const room of escapeGame.list_rooms) {
        escapeGame.list_rooms[i] = await this.roomService.getRoom(room.id);
        i++;
      }
    }
    return escapeGame;
  }

}
