import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { FavoritesComponent } from './favorites.component';
import { SutraListModule } from '../sutra-list/sutra-list.module';

@NgModule({
  declarations: [FavoritesComponent ],
  imports: [
    CommonModule,
    SutraListModule,
    IonicModule, // Add IonicModule here
    RouterModule.forChild([
      {
        path: '',
        component: FavoritesComponent
      }
    ])
  ]
})
export class FavoritesModule {}
