import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Card } from '../model/common.model';
import {  Observable, of, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StoryService {
  storageService = inject(StorageService);

  getAllStoryList(): Observable<Card[] | []> {
    try {
      const story = this.storageService.getLocalStorageItem('storyData')
        ? this.storageService.getLocalStorageItem('storyData')
        : [];

      return of(story);
    } catch (error) {
      return throwError(() => new Error('Failed to get list of data.'));
    }
  }

  postStory(data: Card[]): Observable<string> {
    if (data) {
      this.storageService.setLocalStorageItem('storyData', data);
      return of('Data Added Successfully');
    } else {
      return throwError(() => new Error('Failed to add data.'));
    }
  }

  deleteStoryList(key: string): Observable<string> {
    if (key) {
      this.storageService.removeLocalStorageValue(`${key}`);
      return of('Story deleted successfully');
    } else {
      return throwError(() => new Error('Failed to delete data.'));
    }
  }
}
