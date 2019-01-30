import { EscapegameService } from '../shared/escapegame/escapegame.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationManager } from 'ng2-validation-manager';
import { RoomService } from '../shared/room/room.service';
import { TeamsService } from '../shared/teams/teams.service';
import { AlertService } from '../shared/alerts/services/alert.service';
import { Team } from '../shared/teams/team';
import { Room } from '../shared/room/room';
import { Escapegame } from '../shared/escapegame/escapegame';

import { UserService } from '../shared/user/user.service';

@Component({
  templateUrl: 'create-team.component.html'
})

export class CreateTeamComponent implements OnInit {
  form;
  createTeamForm: FormGroup;
  team: Team;
  room: Room;
  rooms: Room[];
  escapegames: Escapegame[];
  escapegame: Escapegame;
  hoursList: number[] =[];
  placesList: number[] =[];

  constructor(private activatedRoute: ActivatedRoute,
              private teamsService: TeamsService,
              private alert: AlertService,
              private fb: FormBuilder,
              private roomService: RoomService,
              private userService: UserService,
              private escapegameService: EscapegameService,) {
  }

  async ngOnInit() {
    this.escapegames = await this.escapegameService.getEscapegames();
    this.generateForm();
  }

  generateForm() {
    this.team = new Team();
    this.createTeamForm = this.fb.group({
      escapegame: null,
      room: null,
      titre: 'Équipe de Arthur',
      email_reservation: 'arthur.mariani@caramail.fr',
      reservation: 'arthur mariani',
      nb_players: null,
      description: 'Join my team Guys !',
      date: moment().format('YYYY-MM-DD'),
      hour: null,
      unregistered_players: null
    });

    this.form = new ValidationManager({
      titre: 'required|maxLength:20',
      room: 'required',
      email_reservation: 'required|email',
      nb_players: 'required',
      date: 'date',
      description: 'required|maxLength:300',
      hour: 'required',
      reservation: 'required',
      unregistered_players: 'required',
    });
    this.onChanges()
  }

  onChanges(): void {
    this.createTeamForm.valueChanges.subscribe(values => {
      this.team.titre = values.titre;
      this.team.room = values.room;
      this.team.email_reservation = values.email_reservation;
      this.team.nb_players = values.nb_players;
      this.team.description = values.description;
      this.team.date = values.date;
      this.team.reservation = values.reservation;
      this.team.unregistered_players = values.unregistered_players;
      // values.reservation,
      if (values.escapegame) {
        this.getEscapeRooms(values.escapegame);
        if (values.room) {
          this.getTeamInfos(values);
        }
      }
    },
    error => {
      console.log(error);
    });
  }

  async getEscapeRooms(escapeid) {
    this.rooms = await this.roomService.getRooms(
      {
        'escape': escapeid
      }
    );
  }

  async getTeamInfos(values) {
    this.room = await this.roomService.getRoom(values.room);
    let count = this.room.min_place_number;
    this.placesList = [];
    while(count <= this.room.max_place_number){
      this.placesList.push(count);
      count ++;
    }
    this.hoursList = this.room.starting_time.split(',').map(item => parseFloat(item));
    if(!this.team.nb_players){
      this.team.nb_players = this.room.min_place_number;
    }
    this.team.price = await this.getprice(this.room, values.hour, values.nb_players);
    this.team.nb_players_max = this.room.max_place_number;
    this.team.bill_total = this.team.nb_players * this.team.price;
    this.team.admin_id = JSON.parse(localStorage.getItem('user')).id;
  }

  async getprice(room, hour, players) {
    let priceArray = [];
    if (room.escape.peak_offPeak && room.price_peak_hours) {
      if (room.escape.peak_offPeak.split(',').map().includes(hour)) {
        priceArray = room.price_peak_hours.split(',');
      } else if (room.price_offPeak_hours) {
        priceArray = room.price_offPeak_hours.split(',');
      }
    }
    else if (room.price_offPeak_hours) {
      priceArray = room.price_offPeak_hours.split(',');
    }
    if (players <= room.min_place_number) {
      return parseFloat(priceArray[0]);
    } else {
      return parseFloat(priceArray[players - room.min_place_number]);
    }
  }

  async createTeamPublic() {
    try {
      let user = await this.userService.getUserMe();
      //console.log(user)
      this.team.is_public = true;
      this.team.date = new Date(this.team.date).toISOString();
      //this.team.list_players.push(user);
      this.team.list_players = [];
      this.team.list_players.push(user);
      this.team = await this.teamsService.createTeam(this.team);
      //console.log(this.team);
      //this.teamsService.updateTeam(this.team.id, user)
    } catch (error) {
      this.alert.error(error);
    }
  }

  async createTeamPrivate() {
    try {
      let user = await this.userService.getUserMe();
      //console.log(user)
      this.team.is_public = false;
      this.team.date = new Date(this.team.date).toISOString();
      //this.team.list_players.push(user);
      this.team.list_players = [];
      this.team.list_players.push(user);
      this.team = await this.teamsService.createTeam(this.team);
      //console.log(this.team);
      //this.teamsService.updateTeam(this.team.id, user)
    } catch (error) {
      this.alert.error(error);
    }
  }
}
