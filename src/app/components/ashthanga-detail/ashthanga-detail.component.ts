import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ashthangaData from '../../../assets/data/ashthanga.json';
import { LanguageService } from 'src/app/services/language.service';

interface Ashthanga {
  id: number;
  title: { en: string; hi: string };
  Focus: { en: string; hi: string };
  themes: { en: string; hi: string };
  imageUrl: string;
  additional_details: {
    history: { en: string; hi: string };
    importance: { en: string; hi: string };
    practical_application: { en: string; hi: string };
    philosophical_context: { en: string; hi: string };
    case_studies: { en: string; hi: string };
    common_challenges: { en: string; hi: string };
  };
}


@Component({
  selector: 'app-ashthanga-detail',
  templateUrl: './ashthanga-detail.component.html',
  styleUrls: ['./ashthanga-detail.component.scss'],
})
export class AshthangaDetailComponent  implements OnInit {
  ashthanga: Ashthanga | undefined;
  selectedLanguage: 'en' | 'hi' = 'en';
  title: string = '';
  focus: string = '';
  themes: string = '';
  sutrasCount: string = '';
  history : string = '';
  importance : string = '';
  practical_application: string = '';
  philosophical_context: string = '';
  case_studies: string = '';
  common_challenges: string = ''



  constructor(
    private route: ActivatedRoute,
    public languageService: LanguageService

  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ashthanga = (ashthangaData  as Ashthanga[]).find(sutra => sutra.id === id); 
    if (this.ashthanga) {
      this.setLanguageContent();
      this.languageService.selectedLanguage$.subscribe(language => {
        this.selectedLanguage = language as 'en' | 'hi';
        this.setLanguageContent();
      });
    }
  }

  

  setLanguageContent() {
    if (this.ashthanga) {
      this.title = this.ashthanga.title[this.selectedLanguage as keyof typeof this.ashthanga.title] || 'Title Not Available';
      this.focus = this.ashthanga.Focus[this.selectedLanguage as keyof typeof this.ashthanga.Focus] || 'Focus Not Available';
      this.themes = this.ashthanga.themes[this.selectedLanguage as keyof typeof this.ashthanga.themes] || 'Themes Not Available';
      this.history = this.ashthanga.additional_details.history[this.selectedLanguage as keyof typeof this.ashthanga.additional_details.history] || 'History Not Available';
      this.importance = this.ashthanga.additional_details.importance[this.selectedLanguage as keyof typeof this.ashthanga.additional_details.importance] || 'Importance Not Available';
      this.practical_application = this.ashthanga.additional_details.practical_application[this.selectedLanguage as keyof typeof this.ashthanga.additional_details.practical_application] || 'Practical Application Not Available';    this.philosophical_context = this.ashthanga.additional_details.philosophical_context[this.selectedLanguage as keyof typeof this.ashthanga.additional_details.philosophical_context] || 'Philosophical Context Not Available';
      this.case_studies = this.ashthanga.additional_details.case_studies[this.selectedLanguage as keyof typeof this.ashthanga.additional_details.case_studies] || 'Case Studies Not Available';
      this.common_challenges = this.ashthanga.additional_details.common_challenges[this.selectedLanguage as keyof typeof this.ashthanga.additional_details.common_challenges] || 'Common Challenges Not Available';
    }}

}
