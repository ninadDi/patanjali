import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AshthangaService {
  private ashthangaUrl = 'assets/data/ashthanga.json'; 

  constructor(private http: HttpClient) {}

  getAshthangaCategories(): Observable<any[]> {
    return this.http.get<{ categories: Record<string, any> }>(this.ashthangaUrl).pipe(
      map(data => {
        return Object.entries(data).map(([key, value]) => {
          if (typeof value === 'object' && !Array.isArray(value)) {
            return {
              name: key,
              ...value
            };
          } else {
            throw new Error('Expected an object for category data');
          }
        });
      })
    );
  }
}
