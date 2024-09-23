import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { IonContent } from '@ionic/angular';
import sutraData from 'src/assets/data/four_padas.json';

interface Sutra {
  id: number;
  title: { en: string; hi: string };
  Focus: { en: string; hi: string };
  themes: { en: string; hi: string };
  sutras: { en: number; hi: string };
  imgUrl: string;
}

@Component({
  selector: 'app-sutra',
  templateUrl: './sutras.page.html',
  styleUrls: ['./sutras.page.scss']
})
export class SutrasPage implements OnInit {
  sutra: Sutra | undefined;
  title: string = '';
  focus: string = '';
  themes: string = '';
  sutrasCount: string = '';
  selectedLanguage: 'en' | 'hi' = 'en';

  @ViewChild(IonContent, { static: false }) content: IonContent | undefined;

  constructor(
    private route: ActivatedRoute,
    public languageService: LanguageService  
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Assuming sutraData is an array of Sutra objects
    this.sutra = (sutraData as Sutra[]).find(sutra => sutra.id === id);

    if (this.sutra) {
      this.setLanguageContent();
      this.languageService.selectedLanguage$.subscribe(language => {
        this.selectedLanguage = language as 'en' | 'hi';
        this.setLanguageContent();
      });
    }
  }

  setLanguageContent() {
    if (this.sutra) {
      this.title = this.sutra.title[this.selectedLanguage as keyof typeof this.sutra.title] || 'Title Not Available';
      this.focus = this.sutra.Focus[this.selectedLanguage as keyof typeof this.sutra.Focus] || 'Focus Not Available';
      this.themes = this.sutra.themes[this.selectedLanguage as keyof typeof this.sutra.themes] || 'Themes Not Available';
      this.sutrasCount = this.sutra.sutras[this.selectedLanguage as keyof typeof this.sutra.sutras]?.toString() || 'Sutras Not Available';
    }
  }

  scrollToTop() {
    this.content?.scrollToTop(500);
  }

}
