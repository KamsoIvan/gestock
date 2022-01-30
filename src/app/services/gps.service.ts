import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';



@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor(private nativeStorage: NativeStorage) { }

  
  public savePosition(lon, lat) {
    this.nativeStorage.setItem('dbCord', {property: lon, anotherProperty: lat})
    .then(
      () => console.log('Stored item!'),
      error => console.error('Error storing item', error)
    );
  }
  

  public getPosition() {
    this.nativeStorage.getItem('dbCord')
    .then(
      data => console.log(data),
      error => console.error(error)
    ); 
  }
  
}