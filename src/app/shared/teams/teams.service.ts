import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from '../../app.constants';
import { User } from '../user/user';
import { Team } from './team';
import { AuthService } from '../../core/auth/auth.service';
import { RoomService } from '../room/room.service';
import { AvatarService } from '../avatar/avatar.service';

@Injectable()
export class TeamsService {
  user: User;
  team: Team;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  options = { headers: this.headers };

  constructor(private http: HttpClient,
              private configuration: Configuration,
              private authService: AuthService,
              private roomService: RoomService,
              private avatarService: AvatarService) {
    this.authService.getUserSubject().subscribe(user => this.user = user,
      error => console.log(error));

  }

  async getTeams() {
    let teams : Team[];
    try {
      teams = await this.http.get<Team[]>(this.configuration.teamApi, this.options).toPromise();
        for (let team of teams) {
          this.mapTeam(team).then(res => {
            team = res;
          })
        }
    } catch (err) {
      console.log(err);
    }
    return teams;
  }

  async getTeamsByDate() {
    let dateToday = new Date();
    let teams : Team[];
    try {
      await this.http.get<Team[]>(this.configuration.teamApi + '?date_gt=' + dateToday.toISOString() + '&is_public=true', this.options).toPromise().then(res => {
        teams = res;
      });
      for (let team of teams) {
        this.mapTeam(team).then(res => {
          team = res;
        })
      }
      return teams;
    } catch (err) {
      console.log(err);
    }
  }

  async getTeam(id) {
    let team: Team;
    try {
      await this.mapTeam(this.http.get<Team>(this.configuration.teamApi + '/' + id, this.options).toPromise()).then(res => {
        team = res;
      });
      console.log(team);
      this.mapTeam(team).then(res => {
        team = res;
      })
      return team;
    } catch (err) {
      console.log(err);
    }
  }

  createTeam(teamdata): Promise<Team>{
    this.options = { ... this.options, ... teamdata };
    return new Promise( async (resolve, reject) => {
      try {
        const response = await this.http.post<Team>(this.configuration.teamApi, teamdata).toPromise();
        resolve(response);
      } catch (error) {
        reject(error.error.message);
      }
    });
  }

  updateTeam(teamId, teamdata) {
    //this.options = { ... this.options, ... teamdata };
    return new Promise( async (resolve, reject) => {
      try {
        const response = await this.http.put<Team>(this.configuration.teamApi + teamId , teamdata).toPromise();
        resolve(response);
      } catch (error) {
        reject(error.error.message);
      }
    });
  }

    async mapTeam(team){
    team.room = await this.roomService.getRoom(team.room.id);
    for (const player of team.list_players) {
      await this.avatarService.getAvatar(player.avatar_user).then(res => {
        player.avatar_user = res;
      })
    }
    return team;
  }
}
