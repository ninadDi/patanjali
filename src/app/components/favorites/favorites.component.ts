import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: number[] = [];
  title= ''
  selectedLanguage =''
  imgUrl ='./assets/favourites.png'
  @ViewChild(IonContent, { static: false }) content: IonContent | undefined;

  
  constructor(private storageService: StorageService, private languageService: LanguageService) {}

  ngOnInit() {
    this.loadFavorites();
    // Subscribe to language changes
    this.languageService.selectedLanguage$.subscribe(language => {
      this.selectedLanguage = language;
      this.title = this.selectedLanguage === 'en' ? 'Favorites' : 'पसंदीदा';
    });
  }

  loadFavorites() {
    // Subscribe to the bookmarks$ observable
    this.storageService.bookmarks$.subscribe({
      next: (bookmarks) => {
        this.favorites = bookmarks;
      },
      error: (err) => {
        console.error('Error loading bookmarks:', err);
      }
    });
  }


  scrollToTop() {
    this.content?.scrollToTop(500);
  }
}
