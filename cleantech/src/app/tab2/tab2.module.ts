import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { HttpClientModule } from '@angular/common/http';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    Tab2PageRoutingModule
  ],
  declarations: [Tab2Page],
  providers:[FirebaseService, CorreiosService]
})
export class Tab2PageModule {}
