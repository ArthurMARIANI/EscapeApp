import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { RoomService } from '../shared/room/room.service';
import { TeamsService } from '../shared/teams/teams.service';

import * as moment from 'moment';
import { Team } from '../shared/teams/team';

export interface IFormDataKey {
  value: string | number;
  type: string;
  comparator: string;
  placeholder: string;
}
export interface IFormData extends IFormDataTest<IFormDataKey> { }
export interface IFormDataTest<Type> {
  date?: Type;
  places_left?: Type;
  min_price?: Type;
  max_price?: Type;
  'room.theme'?: Type;
  'room.difficulty'?: Type;
}
export interface IFilter extends IFormDataTest<IFilterKey> { }
export interface IFilterKey {
  value: string ;
  comparator: string;
}

@Component({
  templateUrl: './teams.component.html'
})
export class TeamsComponent implements OnInit {
  @ViewChild('selectedTheme') private selectedTheme: NgModel = null;
  @ViewChild('selectedDifficulty') private selectedDifficulty: NgModel  = null;;

  teams: Team[] = [];
  teams_filter: Team[]= [];
  is_filter: boolean = false;
  filtersInput = {
  'themes': [],
  'minPrice': null,
  'maxPrice': null,
  'difficulties': [],
  'min_hour': null};

  filters: IFilter = {};

  formdata: IFormData = {
    'date': {
      value: null,
      type: 'date',
      comparator: '=',
      placeholder: 'Quel jour ?',
    },
    'places_left': {
      value: null,
      type: 'number',
      comparator: '>=',
      placeholder: 'Nombre de places'
    },
    'min_price': {
      value: null,
      type: 'number',
      comparator: '>=',
      placeholder: 'Prix Minimum'
    },
    'max_price': {
      value: null,
      type: 'number',
      comparator: '<=',
      placeholder: 'Prix Maximum'
    },
    'room.theme': {
      value: null,
      type: 'string',
      comparator: '=',
      placeholder: ''
    },

    'room.difficulty': {
      value: null,
      type: 'string',
      comparator: '=',
      placeholder: ''
    },
  };

  filterTeamsForm: FormGroup;

  constructor(private roomService: RoomService,
    private teamsService: TeamsService,
    private fb: FormBuilder, ) {
  }

  async ngOnInit() {
    await this.getFilters();
    let formobject = {};
    Object.keys(this.formdata).forEach(key => {
      formobject[key] = [this.formdata[key].value, this.formdata[key].required]; // needs to be replaced by comparator
      this.filters[key] = {
        value: this.formdata[key].value,
        comparator: this.formdata[key].comparator };
    });
    this.filterTeamsForm = this.fb.group(formobject);
    this.filterTeamsForm.valueChanges.subscribe(values => {
      Object.keys(values).forEach(key => {
        this.filters[key].value = values[key];
      }),
        this.teams_filter = this.filterarray(this.teams, this.filters);
        this.is_filter = true;
    });
  }

  async getFilters() {
    this.teams = await this.teamsService.getTeamsByDate();
    console.log(this.teams);
    for (const team of this.teams) {
      if (this.filtersInput.themes.includes(team.room.theme) === false) { this.filtersInput.themes.push(team.room.theme) }
      if (this.filtersInput.difficulties.includes(team.room.difficulty) === false) { this.filtersInput.difficulties.push(team.room.difficulty) }
    }
  }

  filterarray(array, filters?: IFilter) {
    if (filters) {
      Object.keys(filters).forEach(key => {
        if (filters[key].value) {
          array = array.filter(function (element) {
            let elementAttribute = element;
            for (let keylevel of key.split(".")) {
              if (keylevel === 'max_price'|| keylevel === 'min_price') {
                elementAttribute = elementAttribute.price;
              } else {
                elementAttribute = elementAttribute[keylevel];
              }
            }
            if (filters[key].comparator === '=') {
              if (key === 'date') {
                if (elementAttribute.split("T")[0] == new Date(filters[key].value.toString()).toISOString().split("T")[0]) {
                  return element;
                }
              } else if (elementAttribute == filters[key].value) {
                return element;
              }
            }
            if (filters[key].comparator === '>=') {
              if (key === 'places_left') {
                if (parseInt(element.nb_players_max) - parseInt(element.nb_players) >= parseInt(filters[key].value)){
                  return element;
                }
              }
              else {
                if (elementAttribute >= filters[key].value) {
                  return element;
                }
              }
            }
            if (filters[key].comparator === '<=' && elementAttribute <= filters[key].value) {
              return element;
            }
          })
        }
      })
    }
    return array;
  }


}
