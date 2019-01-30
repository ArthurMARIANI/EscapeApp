import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class Configuration {

  apiUrl = environment.apiURL;

  /* Authentication */
  loginUrl = 'auth/local';
  logoutUrl = 'logout';
  registerUrl = 'auth/local/register';
  refreshTokenUrl = 'token/refresh';
  recoverpasswordUrl = 'auth/forgot-password'
  loginApi = this.apiUrl + this.loginUrl;
  logoutApi = this.apiUrl + this.logoutUrl;
  registerApi = this.apiUrl + this.registerUrl;
  refreshTokenApi = this.apiUrl + this.refreshTokenUrl;
  recoverpasswordApi = this.apiUrl + this.recoverpasswordUrl;

  /* Users */
  userUrl = 'user';
  user_meUrl = 'user/me';
  userApi = this.apiUrl + this.userUrl;
  user_meApi = this.apiUrl + this.user_meUrl;

  /* Teams */
  teamUrl = 'team';
  teamApi = this.apiUrl + this.teamUrl;

  /* Escapegame */
  escapegameUrl = 'escape';
  escapegameApi = this.apiUrl + this.escapegameUrl;

  /* Rooms */
  roomUrl = 'room';
  roomApi = this.apiUrl + this.roomUrl;


  /* Avatars */
  avatarUrl = 'avatar';
  avatarApi = this.apiUrl + this.avatarUrl;

}
