import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private toastController: ToastController, private authService: AuthentificationService, private http: HTTP, private loadingController: LoadingController) { }

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
      keyboardClose: true,
      animated: true,
      duration: 2000,
      color: color,
    })
    toast.present();
  }

  ListWagon(idUser) {
    return this.http.get(`${environment.url}/mesures/list/` + idUser + '/' + 10,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }

  alert_notifications(idUser) {
    return this.http.get(`${environment.url}/alert_notifications/list/` + idUser + '/' + 10,
      {},
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authService.getToken(),
      }
    );
  }


}
