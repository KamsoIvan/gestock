import { UserDetailPage } from './user-detail/user-detail.page';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Platform, ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import * as internal from 'stream';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  navCtrl: any;
  email: string;
  userId: any;

  constructor(
    public modalcontroller: ModalController,
    public toastController: ToastController,
    private router: Router,
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private storage: Storage
  ) {

    this.storage.create();

    this.storage.get('uid').then((res)=>{
      if(res){
        this.navCtrl.navigateRoot('home');
      }else{
        this.navCtrl.navigateRoot('login');
      }
    });

    function initializeApp() {
      this.platform.ready().then(() => {
        this.afAuth.authState.subscribe(auth => {
          if (!auth) {
            console.log('non connecté: Désolé, vos identifiants sont éronés !');
            this.router.navigateByUrl('/login');
          } else {
            this.router.navigateByUrl('/');
            console.log('Connecté: Bienvenue sur la plateforme monsieur' + auth.uid);
          }
        });
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    };
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  Pages=[
    {
      title:'Home',
      url:'/home',
      icon:'home'
    },
    {
      title:'Weather',
      url:'/meteo',
      icon:'cloudy-night'
    },
    {
      title:'Update Product',
      url:'/update-product',
      icon:'refresh'
    },
    {
      title:'New Product',
      url:'/new-product',
      icon:'add'
    },
    {
      title:'Geolocation',
      url:'/gps',
      icon:'map'
    },
    {
      title: 'Sign out',
      url: '/login',
    }
  ];


  async showdetail(){
    const modal = await this.modalcontroller.create({
      component: UserDetailPage,
      componentProps: {details : this.userId}
    });
    return await modal.present();
  }


  // async ngOnInit() {
  //   await this.storage.create();
  // }
}

