import { Room } from '../room/room';
export class Escapegame {
  id: number;
  name: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  peak_offPeak: string;
  school_area: string;
  special_dates: string;
  description: string;
  link: string;
  phone_number: number;
  email: string;
  validation_time: string;
  mongoPay_id: number;
  mongoPay_wallet_id: number;
  commission: number;
  partnership: boolean;
  list_rooms: Room[];
}
