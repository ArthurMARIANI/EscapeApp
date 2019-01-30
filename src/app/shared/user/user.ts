import { Team } from '../teams/team';
import { Avatar } from './../avatar/avatar';

export class User {
  public id: number;
  public username: string;
  public email: string;
  public password: string;
  public first_name: string;
  public last: string;
  public phone_number: string;
  public address: number;
  public postcode: number;
  public city: string;
  public country: string;
  public nationality: string;
  public subscription_day: string;
  public last_connection: string;
  public birthday: string;
  public nb_of_parties: string;
  public mongoPay_user_id: number;
  public mongoPay_wallet_id: number;
  public mongoPay_card_id: number;
  public mongoPay_bankAccount_id: number;
  public cagnotte: number;
  public avatar_user: Avatar;
  public list_teams: Team[] = [];
}
