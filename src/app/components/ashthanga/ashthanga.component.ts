import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AshthangaService } from 'src/app/services/ashthanga.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-ashthanga',
  templateUrl: './ashthanga.component.html',
  styleUrls: ['./ashthanga.component.scss'],
})
export class AshthangaComponent  implements OnInit {
  categories: any[] = [];
  selectedLanguage: string = 'en'; // Default language


  constructor(private ashthangaService: AshthangaService, private languageService: LanguageService, private router: Router) { }

ngOnInit() {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
     this.loadCategories(); 
    });
  }

  loadCategories() {
    this.ashthangaService.getAshthangaCategories().subscribe(data => {
      this.categories = data.map(category => ({
        id: category.id,
        title: category.title[this.selectedLanguage] || 'No title available',
        focus: category.Focus[this.selectedLanguage] || 'No focus available',
        themes: category.themes[this.selectedLanguage] || 'No themes available',
        // sutras: category.sutras[this.selectedLanguage] || 'No sutras available',
        imageUrl: category.imageUrl
      }));
    });
  }

  async navigateToAshthanga(id: number) {
    const language = this.languageService.getLanguage();
    this.router.navigate(['/ashthanga-details', id], {
      state: { selectedLanguage: language }
    });
  }
}
