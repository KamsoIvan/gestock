import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../classes/product';
import { ProductServiceService } from '../services/product-service.service';

import { CrudService } from '../services/firebase.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { isEmpty } from '@firebase/util';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  newproductform: FormGroup;

  constructor(
    private crudService: CrudService,
    public formBuilder: FormBuilder,
    public afDB: AngularFireDatabase,
    private productService: ProductServiceService,
    private router: Router,
    private toastController: ToastController
    ) {}

  ngOnInit() {
      //Validation du formulaire
  }

  async createProduct(p: Product){
    if (isEmpty(p)) {
      return false;
    }else{
      this.crudService.create(p).then(() => {
        this.presentToast();
      }).catch((err) => {
        console.log(err);
      });

    const ss = this.productService.addProduct(p);
    //console.log(ss);
    await  this.router.navigateByUrl('/home');
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Product created successfully',
      duration: 3500
    });
    toast.present();
  }

}
