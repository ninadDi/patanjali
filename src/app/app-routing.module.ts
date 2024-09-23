import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'language-selection',
    loadChildren: () => import('./language-selection/language-selection.module').then(m => m.LanguageSelectionPageModule)
  },
  {
    path: 'sutras/:id',
    loadChildren: () => import('./sutras/sutras.module').then(m => m.SutrasPageModule)
  },
  {
    path: 'sutras-details/:id',
    loadChildren: () => import('./sutra-detail/sutra-detail.module').then(m => m.SutraDetailPageModule)
  },
  {
    path: 'ashthanga-details/:id',
    loadChildren: () => import('./components/ashthanga-detail/ashthanga-detail.module').then(m => m.AshthangaDetailModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./components/category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'favorites/:id',
    loadChildren: () => import('./components/favorites/favorites.module').then(m => m.FavoritesModule)
  },
  {
    path: 'ashthanga',
    loadChildren: () => import('./components/ashthanga/ashthanga.module').then(m => m.AshthangaModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
