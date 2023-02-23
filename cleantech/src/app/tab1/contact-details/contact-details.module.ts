import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactDetailsPageRoutingModule } from './contact-details-routing.module';

import { ContactDetailsPage } from './contact-details.page';
import { FirebaseService } from 'src/app/services/firebase.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContactDetailsPageRoutingModule
  ],
  declarations: [ContactDetailsPage],
  providers:[FirebaseService]
})
export class ContactDetailsPageModule {}
