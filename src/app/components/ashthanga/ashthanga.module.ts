import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { AshthangaComponent } from './ashthanga.component';

@NgModule({
  declarations: [AshthangaComponent],
  imports: [
    CommonModule,
    IonicModule, 
    RouterModule.forChild([
      {
        path: '',
        component: AshthangaComponent
      }
    ])
  ]
})
export class AshthangaModule {}
