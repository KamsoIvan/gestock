import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { CrudService } from '../services/firebase.service';
// import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    name: any;
    email: any;
    password: any;

  constructor(
    private navCtrl: NavController,
    private firebase: AngularFireAuth,
    private storage: Storage
    ) { }

  signup() {
    this.firebase.createUserWithEmailAndPassword(this.email, this.password).then((res) => {
      console.log('response = ' + res);
      this.storage.set('uid', res.user.uid);
   });
  }

  gotosignin() {
    this.navCtrl.navigateForward('login');
  }

  ngOnInit() {
  }

}
