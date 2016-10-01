import {Component, OnInit} from '@angular/core';

import {NavController} from 'ionic-angular';
import {WeatherService} from "../../app/services/weather.service";
import {Subscription} from "rxjs/Rx";
import  _ from 'lodash';
import {Weather} from "../weather/weather";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [WeatherService]
})
export class Settings implements OnInit {

  searchStr;
  defaultCity;
  results = [];
  fetchAutoComplete;
  autoCompleteSubScription: Subscription;

  constructor( public navCtrl: NavController, private weatherService: WeatherService) {

  }

  ngOnInit() {
    this.getDefaultCity();

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

  setDefaultCity(city) {
    this.results = [];

    if (typeof (Storage) !== "undefined") {
      window.localStorage.setItem('city', JSON.stringify(city));
      this.searchStr = city._name;
      this.getDefaultCity();
    } else {
      console.log('local storage not supported');
    }
  }

  getDefaultCity() {
    if (window.localStorage.getItem('city')) {
      this.defaultCity = JSON.parse(window.localStorage.getItem('city')).name;
    } else {
      this.defaultCity = '';
    }
  }

  saveChanges() {
    this.navCtrl.setRoot(Weather);
  }
}
