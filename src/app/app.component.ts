import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { LanguageService } from './services/language.service';
import { ModalController } from '@ionic/angular';
import { SutraService, Sutra } from './services/sutra.service';
import { SutraReelComponent } from './components/sutra-reel/sutra-reel.component';  // Adjust the path based on your project structure

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  chosenLanguage: string | undefined;
  sutras: Sutra[] = [];

  constructor(
    private platform: Platform,
    private storage: Storage,
    private router: Router,
    private languageService: LanguageService,
    private sutraService: SutraService,
    private modalController: ModalController  // Inject the ModalController
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    await this.initializeApp();
  }

  // Initialize the app, load Sutras, and set language
  async initializeApp() {
    await this.platform.ready();
    await this.storage.create();

 // Load Sutras with error handling
 try {
  this.sutras = await this.sutraService.logAllSutras();
  if (this.sutras.length === 0) {
    console.error('No Sutras found.');
  }
} catch (error) {
  console.error('Error loading Sutras:', error);
}
  

    // Load language preference
    const language = await this.storage.get('language');
    if (language) {
      this.languageService.setLanguage(language);
    } else {
      this.router.navigate(['/language-selection']);
    }

    this.languageService.selectedLanguage$.subscribe((lang) => {
      this.chosenLanguage = lang;
    });
  }
  
}
