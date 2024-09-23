import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { AshthangaDetailComponent } from './ashthanga-detail.component';

@NgModule({
  declarations: [AshthangaDetailComponent],
  imports: [
    CommonModule,
    IonicModule, 
    RouterModule.forChild([
      {
        path: '',
        component: AshthangaDetailComponent
      }
    ])
  ]
})
export class AshthangaDetailModule {}
