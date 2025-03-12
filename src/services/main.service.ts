import axios from 'axios';

export class MainService{
    static async getService(){
        return axios.get('https://flight.pequla.com/api/flight')
    }
}