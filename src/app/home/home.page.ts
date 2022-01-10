import { Component } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AuthentificationService } from '../Services/authentification.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  env = environment.pathavatar;
  segment
  constructor(private modalctrl: ModalController, private alertCtrl: AlertController, private nav: NavController, private storage: Storage, private auth: AuthentificationService) { }

  User
  ionViewWillEnter() {
    this.storage.get('currentUser').then((val) => {
      this.User = val;
      console.log('User', this.User)

    });
  }

  logout() {
    this.auth.logout()
  }



}
