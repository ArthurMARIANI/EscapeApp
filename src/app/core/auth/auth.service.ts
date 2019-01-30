import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../app.constants';

export interface IAuth {
  jwt: string;
  user: object;
}

@Injectable()

export class AuthService {

  userSubject$ = new BehaviorSubject(JSON.parse(localStorage.getItem('user'))); // default value of behaviour
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient,
              private configuration: Configuration) {

  }

  login(formData) {
    this.options = { ... this.options, ... formData };
    return new Promise( async (resolve, reject) => {
      try {
        const response = await this.http.post<IAuth>(this.configuration.loginApi, this.options).toPromise();
        this.sendApiResponse(response);
        this.userSubject$.next(response.user);
        resolve(response);
      } catch (error) {
        reject(error.error.message);
      }
    });
  }

  register(formData) {
    this.options = { ... this.options, ... formData };
    return new Promise( async (resolve, reject) => {
      try {
        const response = await this.http.post<IAuth>(this.configuration.registerApi, this.options).toPromise();
        this.sendApiResponse(response);
        this.userSubject$.next(response.user);
        resolve(response);
      } catch (error) {
        reject(error.error.message);
      }
    });
  }

  sendApiResponse(ApiResponse) {
    localStorage.setItem('token', JSON.stringify(ApiResponse.jwt));
    localStorage.setItem('user', JSON.stringify(ApiResponse.user));
  }

  recoverpassword(formData) {
    this.options = { ... this.options, ...formData };
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.http.post<IAuth>(this.configuration.recoverpasswordApi, this.options).toPromise();
        console.log(response);
        this.sendApiResponse(response);
        this.userSubject$.next(response.user);
        resolve(response);
      } catch (error) {
        reject(error.error.message);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject$.next(null);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== undefined;
  }

  getToken() {

    let token = localStorage.getItem('token');
    if (token) {
      token = token.replace(/^"(.*)"$/, '$1');
      return token;
    }
  }

  getUserSubject() {
    return this.userSubject$;
  }
}

