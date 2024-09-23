import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private bookmarksSubject = new BehaviorSubject<number[]>([]);  // BehaviorSubject to track bookmarks

  bookmarks$ = this.bookmarksSubject.asObservable();  // Expose the observable

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
    this.loadInitialBookmarks();  // Load initial bookmarks into the BehaviorSubject
  }

  async ensureStorageInitialized() {
    if (!this._storage) {
      await this.init();
    }
  }

  // Load initial bookmarks from storage and update BehaviorSubject
  private async loadInitialBookmarks() {
    await this.ensureStorageInitialized();
    const bookmarks = (await this._storage?.get('bookmarks')) || [];
    this.bookmarksSubject.next(bookmarks);  // Update BehaviorSubject with the loaded bookmarks
  }

  // Save bookmarks to storage and update BehaviorSubject
  async setBookmark(sutraId: number) {
    await this.ensureStorageInitialized();
    let bookmarks = this.bookmarksSubject.getValue();  // Get current bookmarks
    if (!bookmarks.includes(sutraId)) {
      bookmarks.push(sutraId);
      await this._storage?.set('bookmarks', bookmarks);
      this.bookmarksSubject.next(bookmarks);  // Update the BehaviorSubject
    }
  }

  // Get all bookmarks as observable
  getBookmarks() {
    return this.bookmarks$;  // Return observable of bookmarks
  }

  // Remove a bookmark and update BehaviorSubject
  async removeBookmark(sutraId: number) {
    await this.ensureStorageInitialized();
    let bookmarks = this.bookmarksSubject.getValue();  // Get current bookmarks
    bookmarks = bookmarks.filter((id: number) => id !== sutraId);
    await this._storage?.set('bookmarks', bookmarks);
    this.bookmarksSubject.next(bookmarks);  // Update the BehaviorSubject
  }

  // Check if Sutra is bookmarked (returns boolean)
  async isBookmarked(sutraId: number) {
    const bookmarks = this.bookmarksSubject.getValue();
    return bookmarks.includes(sutraId);
  }
}
