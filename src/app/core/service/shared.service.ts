import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class SharedService{
    storyCount=new BehaviorSubject<number>(0)
    storyCount$=this.storyCount.asObservable();
    constructor(private storageService:StorageService){}

getTotalCount(){
    const count=this.storageService.getLocalStorageItem('storyData')?this.storageService.getLocalStorageItem('storyData')?.length:0
    this.storyCount.next(count)
}

}