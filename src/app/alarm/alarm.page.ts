import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service';
import { RestApiService } from '../Services/rest-api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage implements OnInit {
  segment = "alarm";
  constructor(private auth: AuthentificationService,
    private api: RestApiService,
    private storage: Storage) { }
  User
  ngOnInit() {
    this.storage.get('currentUser').then((val) => {
      this.User = val;
      console.log('User', this.User)
      this.alert_notifications(this.User.id)
    });
  }

  Alerts = []
  alert_notifications(idUser) {
    this.api.loadingFn()
    this.api.alert_notifications(idUser).then(d => {
      let data = JSON.parse(d.data);
      console.log('data', data)
      this.Alerts = data.alert_notifications;
      this.listAlerts = data.alert_notifications;
      console.log('Alerts', this.Alerts)
      console.log('listAlerts', this.listAlerts)
      this.api.dismissFn();

    }).catch(e => {
      console.log('e', e)
      this.api.presentToast('Erreur', 'danger')
      this.api.dismissFn();
    })
  }

  ionViewWillLeave() {
    this.api.dismissFn();
  }

  doRefresh(event) {
    this.alert_notifications(this.User.id)
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  listAlerts = []
  closesitem(event) {
    let val = event.target.value;
    this.Alerts = [];
    this.Alerts = this.listAlerts
    if (val && val.trim() != '') {
      this.Alerts = this.Alerts.filter((location) => {
        if (location.alert.label != null)
          return location.alert.label.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
  }

}
