import { Storage } from '@ionic/storage';
import { GpsService } from './../services/gps.service';
import { Component, OnInit } from '@angular/core';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';



@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})


export class GpsPage implements OnInit {
  lon: any = 0;
  lat: any = 0;

  sliceCordonate = [];

  constructor(private geolocation: Geolocation, private gps :GpsService, private storage:Storage) {
    
  }

  async Init(){
    await this.storage.create();
  }

  getCordonate(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.gps.savePosition(404, 2000)
      this.lat = resp.coords.latitude
      this.lon = resp.coords.longitude
      this.sliceCordonate = [this.lon, this.lat];
      console.log(this.sliceCordonate);
      this.saveCordonate();
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  saveCordonate(){
    this.storage.set("db", this.sliceCordonate)
  }

  ngOnInit() {
    this.Init();
    this.getCordonate();
  }

}
