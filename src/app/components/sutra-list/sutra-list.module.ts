import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // If using Ionic

import { SutraListComponent } from './sutra-list.component';

@NgModule({
  declarations: [SutraListComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [SutraListComponent] 
})
export class SutraListModule { }
