import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage'; // lazy loading

  pages: Array<{ title: string, component: any,ico:any }>;

  constructor(private events: Events, 
              public platform: Platform, 
              public statusBar: StatusBar,
              public splashScreen: SplashScreen
) {
              


    this.events.subscribe('RESPONSE:ERROR', (error: any) => {

    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
    this.pages = [
      { title: 'Home', component: 'HomePage',ico:'ios-home' },
      { title: 'Settings', component: 'SettingsPage',ico:'ios-settings' }
    ];
  }
  openPage(page) {
    this.nav.setRoot(page.component);

  }
  logoutNav() {
    this.nav.setRoot('HomePage');
  }
}

