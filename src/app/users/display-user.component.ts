import { Component } from '@angular/core';
import { AlertService } from '../shared/alerts/services/alert.service';
import { UserService } from '../shared/user/user.service';
import { AvatarService } from '../shared/avatar/avatar.service';
import { User } from '../shared/user/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TeamsService } from '../shared/teams/teams.service';
import * as moment from 'moment';

@Component({
  templateUrl: 'display-user.component.html',
  styleUrls: ['./display-user.css'],
})

export class DisplayUserComponent {
  user: User;
  editionMode: boolean = false;
  updateUserForm: FormGroup;
    momentBirthday: any;

  constructor(private userService: UserService,
    private avatarService: AvatarService,
    public teamService: TeamsService,
    private alert: AlertService,
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {
    this.userService.getUserMe()
      .then(async user => {
        this.user = user;

        let today = new Date();
        this.user.list_teams = this.user.list_teams.filter(team => new Date(team.date) > today);

        for(let i=0; i<this.user.list_teams.length; i ++) {
          this.user.list_teams[i] = await this.teamService.getTeam(this.user.list_teams[i].id);
        }
        console.log(this.user);
          this.momentBirthday = moment(this.user.birthday).format('DD/MM/YYYY');
          this.generateForm();
      },
        error => {
          console.error(error);
        });
  }

  EditionMode(value: boolean) {
    this.editionMode = value;
    if (value == false) {
      this.userService.updateUserMe(this.user);
      this.momentBirthday = moment(this.user.birthday).format('DD/MM/YYYY');
    }
  }

  UpdateUser(formData) {
    for (let key in formData.value) {
      if (formData.value[key]){
        if (key === 'birthday'){
          this.user[key] = new Date(formData.value[key].toString()).toISOString();
        } else {
          this.user[key] = formData.value[key];
        }
      }
    }
    this.userService.updateUserMe(this.user);
    this.EditionMode(false);
  }


  generateForm(){
    this.updateUserForm = this.fb.group({
      first_name: [null],
      last_name: [null],
      email: [null],
      birthday: [null],
      country: [null],
    });
  };

  // this.createTeamForm.valueChanges.subscribe(values => {
  //   this.team = new Team()
  //   this.team.titre = values.titre;
  //   this.team.room = values.room;
  //   this.team.email_reservation = values.email_reservation;
  //   this.team.nb_players = values.nb_players;
  //   this.team.description = values.description;
  //   this.team.date = values.date;
  //   // values.reservation,
  //   if (values.escapegame) {
  //     this.getEscapeRooms(values.escapegame);
  //     if (values.room) {
  //       this.getTeamInfos(values);
  //     }
  //   }
  // },
  //   error => { console.log(error); });
}

