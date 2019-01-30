import { Escapegame } from '../escapegame/escapegame';
export class Room {
    id: number;
    name: string;
    description: string;
    difficulty: string;
    theme: string;
    min_place_number: number;
    max_place_number: number;
    starting_time: string;
    price_peak_hours: string;
    price_offPeak_hours: string;
    image: File;
    escape: Escapegame;
}
