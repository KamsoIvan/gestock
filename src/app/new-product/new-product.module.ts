import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewProductPageRoutingModule } from './new-product-routing.module';

import { NewProductPage } from './new-product.page';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    IonicModule,
    NewProductPageRoutingModule
  ],
  declarations: [NewProductPage]
})
export class NewProductPageModule {}
