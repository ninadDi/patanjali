import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Import IonicModule
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    IonicModule, // Add IonicModule here
    RouterModule.forChild([
      {
        path: '',
        component: CategoryComponent
      }
    ])
  ]
})
export class CategoryModule {}
