import { Component } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';

import { NavController, Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthentificationService } from './Services/authentification.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthentificationService,
    private router: Router,
    private fcm: FCM,
    private storage: Storage,
    private nav: NavController,
    private toastController: ToastController
  ) {
    this.initializeApp();
    this.auth.checkToken();
    this.auth.connect();
  }
  currentUser
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
          this.nav.navigateRoot(`/wagon`);
        } else {
          this.presentToast(data.title);
        }
      });
    })
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}