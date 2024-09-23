import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SutraDetailPageRoutingModule } from './sutra-detail-routing.module';

import { SutraDetailPage } from './sutra-detail.page';
import { SutraListModule } from '../components/sutra-list/sutra-list.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SutraDetailPageRoutingModule,
    SutraListModule 
  ],
  declarations: [SutraDetailPage]
})
export class SutraDetailPageModule {}
