import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';

import {NavController} from 'ionic-angular';
import {WeatherService} from "../../app/services/weather.service";
import {Subscription} from "rxjs/Rx";
import  _ from 'lodash';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
  providers: [WeatherService]
})
export class Weather implements OnInit,OnDestroy {

  city: string;
  state: string;
  weatherSubScription: Subscription;
  autoCompleteSubScription: Subscription;
  weather;
  results;
  fetchAutoComplete;
  zmw;

  @ViewChild("userInput") userInput;


  constructor(public navCtrl: NavController, private weatherService: WeatherService) {
    this.city = 'Mol';
    this.state = 'MA';
  }

  ngOnInit(): void {
    this.getDefaultCity();
    this.fetchWeather(this.zmw);

    this.fetchAutoComplete = _.debounce(input => {
      this.autoCompleteSubScription = this.weatherService.searchCities(input)
        .subscribe(res => {
          this.results = res.RESULTS;
        });
    }, 200);
  }

  getQuery(input) {
    this.fetchAutoComplete(input);
  }

  chooseCity(city) {
    this.results = [];
    this.fetchWeather(city.zmw);
  }

  getDefaultCity() {
    if(localStorage.getItem('city')) {
        this.zmw = JSON.parse(window.localStorage.getItem('city')).zmw;
    } else {
      this.zmw = '00000.13.06464';
    }

  }

  fetchWeather(zmw) {
    this.weatherSubScription = this.weatherService.getWeather(zmw)
      .subscribe(weather => {
        this.weather = weather.current_observation;
      });
  }

  ngOnDestroy(): void {
    this.weatherSubScription.unsubscribe();
    this.autoCompleteSubScription.unsubscribe();
  }

}
