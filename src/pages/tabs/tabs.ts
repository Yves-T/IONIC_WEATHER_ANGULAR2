import { Component } from '@angular/core';

import {Weather} from "../weather/weather";
import {Settings} from "../settings/settings";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  weatherRoot = Weather;
  settingsRoot = Settings;

  constructor() {

  }
}
