import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { SwiperModule } from 'swiper/angular';

import { SutraReelComponent } from './sutra-reel.component';

@NgModule({
  declarations: [SutraReelComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,   
    // SwiperModule 
  ],
  exports: [SutraReelComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add CUSTOM_ELEMENTS_SCHEMA to handle custom elements like Swiper
})
export class SutraReelModule {}
