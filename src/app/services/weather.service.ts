import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  apiKey: string;
  conditionsUrl: string;
  searchUrl:string;

  static get parameters() {
    return [[Http]];
  }

  constructor(private http: Http) {
    this.http = http;
    this.apiKey = '';
    this.conditionsUrl = `http://localhost:8100/api/${this.apiKey}/conditions/q`;
    this.searchUrl = `http://localhost:8100/search/aq?query=`;
  }

  getWeather(zmw) {
    // return this.http.get(this.conditionsUrl + '/' + 'Belgium' + '/' + city + '.json')
    //   .map(res => res.json());
    return this.http.get(`${this.conditionsUrl}/zmw:${zmw}.json`)
      .map(res => res.json());
  }

  searchCities(searchStr:string) {
    return this.http.get(this.searchUrl + searchStr + '&c=BE')
      .map(res => res.json());
  }
}
