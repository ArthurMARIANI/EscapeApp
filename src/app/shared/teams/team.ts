import { Room } from '../room/room';
import { User } from '../user/user';
export class Team {
  titre: string;
  room: Room;
  email_reservation: string;
  nb_players: number;
  description: string;
  date: string;
  price: number;
  admin_id: number;
  bill_total: number;
  list_players: User[] = [];
  nb_players_max: number;
  reservation: string;
  is_public: boolean;
  unregistered_players: string;
  id: number;
}
