import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Room } from './room';


@Component({
  selector: 'app-room',
  templateUrl: 'room-price.component.html',
  styleUrls: ['./room-price.component.scss']
})

export class RoomComponent implements OnInit {
  room: Room;
  rooms: Room[];

  constructor(
        private roomService: RoomService) {
  }
  ngOnInit() {
    this.getRooms();
  }

  async getRoom(id) {
    this.room = await this.roomService.getRoom(id);
    return this.room;
  }

  async getRooms() {
    this.rooms = await this.roomService.getRooms();
    return this.rooms;
  }

}
