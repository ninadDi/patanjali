import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private selectedLanguageSubject = new BehaviorSubject<string>('en');
  selectedLanguage$ = this.selectedLanguageSubject.asObservable();

  constructor(private storage: Storage) {
    this.storage.create().then(() => this.loadInitialLanguage());
  }
 ;
  

  async loadInitialLanguage() {
    const savedLanguage = await this.storage.get('language');
    this.selectedLanguageSubject.next(savedLanguage || 'en');
  }

  setLanguage(language: string) {
    this.selectedLanguageSubject.next(language);
    this.storage.set('language', language); // Save language in storage for persistence
  }

  getLanguage(): string {
    return this.selectedLanguageSubject.value;
  }
}
