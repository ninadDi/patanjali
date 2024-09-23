import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { CategoryModule } from './components/category/category.module';
import { SutraListModule } from './components/sutra-list/sutra-list.module'; 
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { SutraReelModule } from './components/sutra-reel/sutra-reel.module';


@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [IonicStorageModule.forRoot(),
    BrowserAnimationsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, CategoryModule, SutraListModule, HttpClientModule,  SutraReelModule, IonicStorageModule.forRoot()],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
  ],  bootstrap: [AppComponent],
})
export class AppModule {}
