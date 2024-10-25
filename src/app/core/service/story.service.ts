import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Card } from '../model/common.model';
@Injectable({
  providedIn: 'root',
})
export class StoryService{
    storageService = inject(StorageService);


    getAllStoryList():Card[]|[]{
        const data = this.storageService.getLocalStorageItem(
            'storyData'
          )
            ? this.storageService.getLocalStorageItem('storyData')
            : [];
        return data;
    }

    postStory(data:Card[]){
        this.storageService.setLocalStorageItem('storyData', data);
    }

    deleteStoryList(key:string){
        this.storageService.removeLocalStorageValue(`${key}`);
    }
}