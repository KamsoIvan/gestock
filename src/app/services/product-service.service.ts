import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { CrudService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  p = new Product('Tomato', 'ax0910', 90, 'Alimental product 200g', 500);

  private products: Array<Product> = [];

  constructor() {
    this.products.push();
  }

  public getProduct(ref: string) {
    return this.products.filter(item => item.reference === ref)[0];
  }

  public getProducts(){
    return this.products;
  }

  public addProduct(p: Product){
    this.products.push(p);
    return this.products;
  }

  private removeProduct(p: Product) {
    const index = this.products.indexOf(p);
    this.products.splice(index, 1);
  }


  private updateProduct(p: Product) {
  }

}
