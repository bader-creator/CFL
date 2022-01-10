import { Injectable } from '@angular/core';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { environment } from '../../environments/environment'
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FCM } from '@ionic-native/fcm/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private network: Network, private helper: JwtHelperService,
    private storage: Storage,
    private http: HTTP,
    private nav: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController, private fcm: FCM) { }

  connected
  connect() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.presentToast('Impossible d’établir une connexion ', "danger");
      this.connected = false;
      console.log("connected", this.connected)
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.connected = true;
      console.log("connected", this.connected)
      this.presentToast('vous êtes connecté sur ' + '' + this.network.type + '' + 'Connection', "primary");

    });
  }

  async loadingFn() {
    this.loadingController.create({
      message: 'Please wait...',
      spinner: 'bubbles',
    }).then((res) => {
      res.present();
    });
  }

  async dismissFn() {
    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color,
    });
    toast.present();
  }
  token
  currentUser = { "id": null, "firstName": null, "lastName": null, "groupe": null, "email": null, "path": null, "phone": null, "userName": null, "roles": [] }
  login(credentials) {
    this.loadingFn();
    this.http.post(`${environment.url}/login_check`, credentials, { 'Content-Type': 'application/json' })
      .then(data => {
        //convert to json
        let resultat = JSON.parse(data.data);
        console.log("resultat", resultat);
        this.currentUser.id = resultat.data.id;
        this.currentUser.firstName = resultat.data.firstName;
        this.currentUser.lastName = resultat.data.lastName;
        this.currentUser.groupe = resultat.data.groupe;
        this.currentUser.email = resultat.data.email;
        this.currentUser.roles = resultat.data.roles;
        this.currentUser.path = resultat.data.path;
        this.currentUser.phone = resultat.data.phone;
        this.currentUser.userName = resultat.data.userName;
        this.token = resultat.token;
        this.fcm.getToken().then(data => {
          console.log("mytokenfirebase: ", data);
          console.log('currentUser', this.currentUser)
          this.setTokenFireBase(this.currentUser.id, data);
        });
        console.log('currentUser', this.currentUser)
        this.storage.set('token', this.token);
        this.storage.set('currentUser', this.currentUser)
        this.dismissFn();
        this.presentToast("Authentification effectuée avec succès", "success");
        this.nav.navigateForward(`/home`);

      }).catch(error => {
        console.log(error);
        this.presentToast('le nom d\'utilisateur ou mot de passe est incorrect', "danger");
        this.dismissFn();
      });
  }
  async logout() {
    let alert = await this.alertController.create({
      header: 'Logging out ',
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'YES',
          handler: () => {
            this.token = "";
            this.storage.remove('token');
            this.storage.remove('currentUser');
            this.nav.navigateForward(`/login`);
          }
        }
      ]
    });
    await alert.present();
  }

  public getToken() {
    return this.token;
  }

  user
  checkToken() {
    this.storage.get('token').then((val) => {
      console.log('Your token is', val);
      let decoded = this.helper.decodeToken(val);
      let isExpired = this.helper.isTokenExpired(val);
      console.log("decode", decoded);
      if (!isExpired) {
        this.token = val;
        console.log("decode", decoded);
        console.log('tokentoken', this.token)
        this.nav.navigateRoot(`/home`);
      } else {
        this.storage.remove('token');
        this.storage.remove('currentUser');
        this.nav.navigateRoot(`/login`);
      }
    })
  }

  public setTokenFireBase(user_id, token = null) {
    let data = { user_id: user_id, token: token }
    console.log("data", data);
    this.http.post(`${environment.url}/setTokenFireBase`, data, {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.getToken(),
    });
  }



}
