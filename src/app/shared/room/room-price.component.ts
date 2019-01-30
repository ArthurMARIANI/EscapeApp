import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from './room.service';
import { Room } from './room';


@Component({
  selector: 'app-room-price',
  templateUrl: 'room-price.component.html',
  styleUrls: ['./room-price.component.scss']
})

export class RoomPriceComponent  {

  constructor(
        private roomService: RoomService) {
  }

  @Input() room: Room;


  ngOnInit() {
    this.getpricearray(this.room);
  }

  getpricearray(room) {
    let count = 0;
    const prices = new Array(3);
    prices[0] = new Array();
    prices[1] = new Array();
    prices[2] = new Array();

    for (let i = room.min_place_number; i <= room.max_place_number; i++) {
      prices[0][count] = i;
      prices[1][count] = room.price_offPeak_hours.split(',')[count];
      if (room.price_peak_hours) {
        prices[2][count] = room.price_peak_hours.split(',')[count];
      } else {
        prices[2][count] = 'non';
      }
      count++;
    }
    room.prices = prices;
    delete room.price_peak_hours;
    delete room.price_offPeak_hours;
    return room;
  }

}
