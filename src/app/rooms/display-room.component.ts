import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../shared/room/room.service';
import { Room } from '../shared/room/room';
import { Escapegame } from '../shared/escapegame/escapegame';

@Component({
  templateUrl: 'display-room.component.html',
  styleUrls: ['rooms.scss']
})
export class DisplayRoomComponent {
  map: google.maps.Map;
  room: Room;
  escapegame: Escapegame;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roomService: RoomService,
  ) {}

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async params => {
      this.room = await this.roomService.getRoom(params.id);
    });
  }
}
