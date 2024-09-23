import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesUrl = 'assets/data/categories.json'; // Path to the JSON file

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<{ categories: Record<string, any> }>(this.categoriesUrl).pipe(
      map(data => {
        return Object.entries(data.categories).map(([key, value]) => {
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
