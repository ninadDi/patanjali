import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.page.html',
  styleUrls: ['./language-selection.page.scss'],
})
export class LanguageSelectionPage {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिन्दी' }
  ];
  isLoading = false;
  selectedLanguage ='en'


  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  selectLanguage(languageCode: string) {
    this.isLoading  = true
    this.languageService.setLanguage(languageCode);
    this.router.navigate(['/home']); 
    this.isLoading  = false;
  }
}
