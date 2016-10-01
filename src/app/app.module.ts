import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import {Weather} from "../pages/weather/weather";
import {Settings} from "../pages/settings/settings";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    Weather,
    Settings
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    Weather,
    Settings
  ],
  providers: []
})
export class AppModule {}
