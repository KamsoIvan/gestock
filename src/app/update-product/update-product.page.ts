import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';

import { CrudService } from '../services/firebase.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../classes/product';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {

  updateForm: FormGroup;
  ref: any;
  id: any;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private crudService: CrudService,
    private activatedRoute: ActivatedRoute,
    private productService: ProductServiceService,
    private toastController: ToastController
    ) { }

  ngOnInit() {

    this.updateForm = this.formBuilder.group({
      name: [''],
      reference: [''],
      pu: [''],
      qte: [''],
      description: ['']
    });
    Promise.resolve(this.activatedRoute.params.subscribe(
      data => {
          //Check existance de a la reference
         // this.product=this.firebaseService.getProductByRef(data.reference);
          this.ref = data.reference;
          console.log(this.ref);
        }
      )).then(() => {
        Promise.resolve(this.crudService.getProductByRef(this.ref)).then((data) => {
          this.id = data.id;
          this.updateForm = this.formBuilder.group({
            name: [data.name],
            reference: [data.reference],
            pu: [data.pu],
            qte: [data.qte],
            description: [data.description]
          });
      });
    });
  };

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Product updated',
      duration: 2000
    });
    toast.present();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  updateProduct(p: Product){
    this.crudService.update(this.id, this.updateForm.value);
    this.presentToast();
    //const ss = this.productService.addProduct(p);
    //console.log(ss);
    console.log(this.crudService.getArray());
  }

}
