import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../app.constants';
import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { Avatar } from './avatar';
import * as _ from 'lodash'

@Injectable()
export class AvatarService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };
  avatars: any;

  constructor(private http: HttpClient,
    private configuration: Configuration) {}

  ngOnInit() {
    this.getAvatars();
  }

  async getAvatars() {
    if(!this.avatars){
      try {
        this.avatars = _.mapKeys(await this.http.get<Avatar[]>(this.configuration.avatarApi, this.options).toPromise(), 'id');
      } catch (err) {
        console.log(err);
      }
    }
    return this.avatars;
  }

  async getAvatar(id) {
    await this.getAvatars();
    return this.avatars[id];
  }

  async getRandomAvatar(exclude?) {
    let avatars: Avatar[];
    avatars = await this.getAvatars();
    if (exclude && avatars[Math.floor(this.getRandomInt(Object.keys(avatars).length))].id == exclude) {
      this.getRandomAvatar(exclude)
    }
    return avatars[Math.floor(this.getRandomInt(Object.keys(avatars).length))];
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
