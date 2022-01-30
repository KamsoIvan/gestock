import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import {IonicStorageModule} from '@ionic/storage-angular';
import {Drivers} from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//firebase Module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
//Environment
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    //AngularFireAuth,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot({
      name: 'MyLocations',
      driverOrder: [Drivers.IndexedDB, 'sqlite', 'websql']
})



],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, Geolocation, NativeStorage],
  bootstrap: [AppComponent],
})
export class AppModule {}
