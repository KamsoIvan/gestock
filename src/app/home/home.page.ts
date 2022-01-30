import { NewProductPage } from './../new-product/new-product.page';
import { CrudService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
// import { IonicAuthService } from '../services/auth.service';
import { ProductServiceService } from '../services/product-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, ToastController  } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { signOut } from 'firebase/auth';
import { async } from '@firebase/util';
import { UserDetailPage } from '../user-detail/user-detail.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public products: Array<Product> = [];
  ionicAuthService: any;
  userId: any;
  mail: any;
  method: any;

  constructor(
    private router: Router,
    // private ionicAuthService: IonicAuthService,
    public alertController: AlertController,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    public modalcontroller: ModalController,
    private productService: ProductServiceService,
    public afAuth: AngularFireAuth
    ) {
      this.afAuth.authState.subscribe(auth => {
        if (!auth) {
          console.log('Vous n\'êtes pas actuellement connecté');
        } else {
          console.log('connecté: ' + auth.uid);
          this.userId = auth.uid;
          this.mail = auth.email;
          this.method = auth.providerData[0].providerId;
        }
      });
  }

  async ngOnInit() {
    this.doRefresh(event);
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.ionViewWillEnter();
      }
    });
  }


  async presentAlertConfirm(id: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you really want to <strong>delete</strong> this article?!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            this.crudService.delete(id);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }


  ionViewWillEnter(){
    this.products=[];
    this.products = this.crudService.getArray();
    this.crudService.getProducts().subscribe((res) => {
      Promise.resolve(this.products = res.map((t) => ({
         id: t.payload.doc.id,
         ...t.payload.doc.data() as Product
       })).sort((a,b) => a.name.localeCompare(b.name))
    ).then(()=>{
     //  console.log('done');
     //  console.log(this.products);
      this.crudService.setArray(this.products);
    });
   });
  }


  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }

  remove(id) {
    this.presentAlertConfirm(id).then(()=>{
      setTimeout(() => {
        this.presentToast();
      }, 4000);
    } );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Product deleted',
      duration: 2000,
    });
    toast.present();
  };


  signOut(){
    this.ionicAuthService.signoutUser().then(res => {
        this.router.navigateByUrl('login');
    }).catch(error => {
      console.log(error);
    });
  };


}
