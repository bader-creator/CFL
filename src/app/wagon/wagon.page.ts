import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../Services/authentification.service';
import { RestApiService } from '../Services/rest-api.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-wagon',
  templateUrl: './wagon.page.html',
  styleUrls: ['./wagon.page.scss'],
})
export class WagonPage implements OnInit {
  segment = "wagon";
  constructor(private auth: AuthentificationService, private nav: NavController, private storage: Storage, private api: RestApiService) { }
  User
  ngOnInit() {
    this.storage.get('currentUser').then((val) => {
      this.User = val;
      console.log('User', this.User)
      this.ListWagon(this.User.id)
    });
  }


  logout() {
    this.auth.logout()
  }


  Wagon = []
  ListWagon(idUser) {
    this.api.loadingFn()
    this.api.ListWagon(idUser).then(d => {
      let data = JSON.parse(d.data);
      this.Wagon = data.site
      console.log('this.wagon', this.Wagon)
      for (let i = 0; i < this.Wagon['wagons'].length; i++) {
        for (let j = 0; j < this.Wagon['boxes'].length; j++) {
          if (this.Wagon['boxes'][j].wagon) {
            if (this.Wagon['wagons'][i].id == this.Wagon['boxes'][j].wagon.id) {
              if (!this.Wagon['wagons'][i].Boxes) {
                this.Wagon['wagons'][i].Boxes = []
              }
              this.Wagon['wagons'][i].Boxes.push(this.Wagon['boxes'][j])
              for (let x = 0; x < this.Wagon['boxes'][j]['devices'].length; x++) {
                if (this.Wagon['boxes'][j]['devices'][x].indicator.id == 187) {
                  this.Wagon['boxes'][j]['devices'] = this.Wagon['boxes'][j]['devices'][x]
                }
              }

            }
          }

        }
      }

      this.Wagon = this.Wagon['wagons']
      this.listWagons = this.Wagon
      console.log('Wagon', this.Wagon)
      console.log('listWagons', this.listWagons)
      this.api.dismissFn();

    }).catch(e => {
      console.log('e', e)
      this.api.presentToast('Erreur', 'danger')
      this.api.dismissFn();
    })
  }

  doRefresh(event) {
    this.ListWagon(this.User.id)
    setTimeout(() => {
      event.target.complete();
    }, 1500);
  }

  ionViewWillLeave() {
    this.api.dismissFn();
  }

  listWagons = []
  closesitem(event) {
    let val = event.target.value;
    this.Wagon = [];
    this.Wagon = this.listWagons
    if (val && val.trim() != '') {
      this.Wagon = this.Wagon.filter((location) => {
        if (location.name != null)
          return location.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
      })
    }
  }


}
