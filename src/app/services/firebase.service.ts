import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Product } from 'src/app/classes/product';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  products: Array<Product> = [];

  constructor(
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }

  create(product: Product) {
    return this.ngFirestore.collection('product').add(product);
  }

  getTasks() {
    return this.ngFirestore.collection('product').snapshotChanges();
  }

  getArray(){
    return this.products;
  }

  setArray(prod: Product[]) {
    this.products.push(...prod);
  }

  getProducts() {
    this.products=[];
   return  this.ngFirestore.collection('Products').snapshotChanges();
 }

  getProduct(id: string) {
    return this.ngFirestore.collection('Products').doc(id).snapshotChanges();
  }

  public getProductByRef(ref: string) {
    return this.products.filter(item => item.reference === ref)[0];
  }

  update(id: string, product: Product) {
    this.products=[];
    this.ngFirestore.collection('Products').doc(id).update(product)
      .then(() => {
        this.router.navigate(['/home']);
      }).catch(error => console.log(error));;
  }


  delete(id: string) {
    this.ngFirestore.doc('Products/' + id).delete().then(()=>{
      console.log('Product successfully deleted');
    }).catch(e=>console.log(e));
  }

}
