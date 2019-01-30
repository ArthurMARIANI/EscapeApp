import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../app.constants';
import { Room } from './room'

@Injectable()
export class RoomService {

  apiRoom: string;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient,
    private configuration: Configuration) {
  }

  async getRooms( filters? ) {
    const rooms = await this.http.get<Room[]>(this.configuration.roomApi + this.toUrl(filters), this.options).toPromise();
   return rooms;
  }

  async getRoom(id) {
    const room = await this.http.get<Room>(this.configuration.roomApi + '/' + id, this.options).toPromise();
    return room;
  }

  toUrl(filters) {
    let filtersUrl = null;
    if (filters) {
      for (let [key, value] of Object.entries(filters)) {
        if (value != null) {
          if (filtersUrl === null) {
            filtersUrl = '?' + key + '=' + value;
          } else {
            filtersUrl = filtersUrl + '&' + key + '=' + value;
          }
        }
      }
      return filtersUrl;
    } else {
      return '';
    }
  }
}
