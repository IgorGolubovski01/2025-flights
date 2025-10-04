import { AirlineModel } from "../app/models/airline.model";

export class AirlineService{
    static getAirlines(): AirlineModel[]{
        return [
            {
                id: 1,
                name: 'Air Serbia',
                countryOfOrigin: 'Serbia',
                website: 'https://www.airserbia.com/'
            },
            {
                id: 2,
                name: 'Fly Emirates',
                countryOfOrigin: 'UAE',
                website: 'https://www.emirates.com/'
            },
            {
                id: 3,
                name: 'Lufthansa',
                countryOfOrigin: 'Germany',
                website: 'https://www.lufthansa.com/'
            },
            {
                id: 4,
                name: 'Turkish Airline',
                countryOfOrigin: 'Turkey',
                website: 'https://www.turkishairlines.com/'
            }
        ]
    }

    static getAirlineById(id: number){
        return this.getAirlines().find(airline=>airline.id === id)
    }
}