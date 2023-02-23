import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { HttpClientModule } from '@angular/common/http';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { FirebaseService } from '../services/firebase.service';
import { CorreiosService } from '../services/correios.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page],
  providers: [FirebaseService, CorreiosService],
})
export class Tab1PageModule {}
