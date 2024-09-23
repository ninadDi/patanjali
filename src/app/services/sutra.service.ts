import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

export interface Sutra {
  id: number;
  chapter: number;
  title: {
    original: string;
    original_english: string;
  };
  meaning: {
    en: string;
    hi: string;
  };
  translations: Translation[];
}

export interface Translation {
  page: number;
  text?: {
    original: string;
    original_english: string;
  };
  meaning?: {
    en: string;
    hi: string;
  };
  significance?: {
    en: string;
    hi: string;
  };
  contextual_interpretation?: {
    en: string;
    hi: string;
  };
  deeper_implications?: {
    en: string;
    hi: string;
  };
}
@Injectable({
  providedIn: 'root'
})
export class SutraService {

  private sutrasUrl = 'assets/data/sutras.json';
  private categoriesUrl = "assets/data/categories.json"
  private searchTermSubject = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private storageService: StorageService) { }

  setSearchTerm(term: string) {
    this.searchTermSubject.next(term);
  }

  logAllSutras(): Promise<Sutra[]> {
    return this.http.get<{ sutras: Sutra[] }>(this.sutrasUrl)
      .toPromise()
      .then(data => data?.sutras || []);  // Extract sutras or return an empty array if undefined
  }
  
  getSutrasByChapter(chapter: number): Observable<Sutra[]> {
    return this.http.get<{ sutras: Sutra[] }>(this.sutrasUrl).pipe(
      map(data => data.sutras.filter(sutra => sutra.chapter === chapter)),
      this.applySearchFilter() // Apply search filtering here
    );
  }

  getSutrasByList(sutraList: number[]): Observable<Sutra[]> {
    return this.http.get<{ sutras: Sutra[] }>(this.sutrasUrl).pipe(
      map(data => data.sutras.filter(sutra => sutraList.includes(sutra.id))),
      this.applySearchFilter() // Apply search filtering here as well
    );
  }

   // Fetch favorite sutras from local storage and filter from sutras.json
   getFavoriteSutras(): Observable<Sutra[]> {
    return from(this.storageService.getBookmarks()).pipe(
      switchMap((bookmarkIds: number[]) => this.http.get<{ sutras: Sutra[] }>(this.sutrasUrl).pipe(
        map(data => data.sutras.filter(sutra => bookmarkIds.includes(sutra.id))),
        this.applySearchFilter()
      ))
    );
  }

  getSutrasByCategory(categoryId: number): Observable<Sutra[]> {
    return this.http.get<{ categories: any[] }>(this.categoriesUrl).pipe(
      map(data => {
        const category = data.categories.find(cat => cat.id === categoryId);
        if (category) {
          return category.sutras; // Return sutras array for the matched category
        } else {
          return [];
        }
      }),
      switchMap(sutrasIds => 
        this.http.get<{ sutras: Sutra[] }>(this.sutrasUrl).pipe(
          map(data => data.sutras.filter(sutra => sutrasIds.includes(sutra.id))),
          this.applySearchFilter() // Apply search filtering here as well
        )
      )
    );
  }

  private applySearchFilter() {
    return switchMap((sutras: Sutra[]) => this.searchTermSubject.pipe(
      map(term => sutras.filter(sutra =>
        (sutra?.title?.original_english?.toLowerCase()?.includes(term.toLowerCase()) ?? false) ||
        (sutra?.title?.original?.includes(term) ?? false) ||
        (sutra?.meaning?.en?.toLowerCase()?.includes(term.toLowerCase()) ?? false) ||
        (sutra?.meaning?.hi?.includes(term) ?? false) ||
        (sutra?.translations?.some((translation: Translation) =>
          (translation?.text?.original_english?.toLowerCase()?.includes(term.toLowerCase()) ?? false) ||
          (translation?.text?.original?.includes(term) ?? false) ||
          (translation?.meaning?.en?.toLowerCase()?.includes(term.toLowerCase()) ?? false) ||
          (translation?.meaning?.hi?.includes(term) ?? false)
        ) ?? false)
      ))
    ));
  }
}
