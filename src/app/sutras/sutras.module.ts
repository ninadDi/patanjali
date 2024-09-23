import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SutrasPageRoutingModule } from './sutras-routing.module';

import { SutrasPage } from './sutras.page';
import { SutraListModule } from '../components/sutra-list/sutra-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SutrasPageRoutingModule,
    IonicModule,
    SutraListModule 
  ],
  declarations: [SutrasPage]
})
export class SutrasPageModule {}  
