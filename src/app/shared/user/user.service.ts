import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../app.constants';
import { AuthService } from '../../core/auth/auth.service';
import { AvatarService } from './../avatar/avatar.service';
import { User } from './user';

@Injectable()
export class UserService {
  user = User;
  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.authService.getToken()
    }) };

  constructor(
    private http: HttpClient,
    private configuration: Configuration,
    private authService: AuthService,
    private avatarService: AvatarService,
  ) {}

  async getUserMe() {
    let userMe = await this.http.get<User>(this.configuration.user_meApi, this.options).toPromise()
    this.avatarService.getAvatar(userMe.avatar_user.id).then(res => {
      userMe.avatar_user = res;
    })
    return userMe;
  }

  updateUserMe(userDatas){
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.http.put<User>(this.configuration.userApi + '/' + userDatas.id, userDatas, this.options).toPromise();
        resolve(response);
      } catch (error) {
        reject(error.error.message);
      }
    });
  }
}
