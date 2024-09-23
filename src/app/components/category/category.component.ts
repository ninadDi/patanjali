import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent  implements OnInit {
  categories: any[] = [];
  selectedLanguage: string = 'en'; // Default language
  selectedCategorySutras: any[] = [];


  constructor(private categoriesService: CategoriesService, private languageService: LanguageService, private router: Router) { }

  async ngOnInit() {
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
      this.loadCategories(); 
    });
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data.map(category => ({
        id: category.id,
        title: category.title[this.selectedLanguage] || 'No title available',
        focus: category.Focus[this.selectedLanguage] || 'No focus available',
        themes: category.themes[this.selectedLanguage] || 'No themes available',
        sutras: category.sutras[this.selectedLanguage] || 'No sutras available',
        imageUrl: category.imageUrl
      }));
    });
  }
  async navigateToCategory(id: number) {
    const language = this.languageService.getLanguage();
    this.router.navigate(['/sutras-details', id], {
      state: { selectedLanguage: language }
    });
  }
}


