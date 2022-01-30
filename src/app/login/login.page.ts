import { Storage } from '@ionic/storage';
import { Auth } from './../../../node_modules/@angular/fire/auth/auth.d';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';
import { CrudService } from '../services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  name: any;
  email: any;
  password: any;

  constructor(
    public toastController: ToastController,
    public afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private firebase: AngularFireAuth,
    private storage: Storage
  ) { }

     gotosignup(){
      this.navCtrl.navigateForward('signup');
    }
    async ngOnInit() {
      await this.storage.create();
    }


  signin() {
    this.firebase.signInWithEmailAndPassword(this.email, this.password).then((res) => {
      console.log('response = ' + res);
      this.storage.set('uid', res.user.uid);
      this.navCtrl.navigateRoot('home');
   });

  }


  // logIn() {
  //   this.afAuth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
  //   .then(auth => {
  //     console.log('utilisateur connecté');
  //   })
  //   .catch(err => {
  //     console.log('Erreur: ' + err);
  //     this.errorMail();
  //   });
  // }

  // signUp() {
  //   this.afAuth.createUserWithEmailAndPassword(this.loginData.email, this.loginData.password)
  //   .then(auth => {
  //     console.log('utilisateur connecté');
  //   })
  //   .catch(err => {
  //     console.log('Erreur: ' + err);
  //     this.errorMail();
  //   });
  // }

  async errorMail() {
    const toast = await this.toastController.create({
      message: 'Email ou mot de passe incorrect',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
