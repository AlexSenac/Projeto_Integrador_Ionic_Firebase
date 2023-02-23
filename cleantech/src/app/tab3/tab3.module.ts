import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { HttpClientModule } from '@angular/common/http';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,    
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page],
  providers:[FirebaseService, CorreiosService]
})
export class Tab3PageModule {}
