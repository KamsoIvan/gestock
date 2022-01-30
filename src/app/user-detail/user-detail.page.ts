import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
})
export class UserDetailPage implements OnInit {

  userId: any;
  mail: any;
  method: any;
  afAuth: any;

  constructor(
    public modalcontroller: ModalController,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.signOut();
  }

  dismiss(){
    this.modalcontroller.dismiss();
  }

}
