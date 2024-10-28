import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  STORAGE_KEY = 'SCRUM-';
  constructor() {}

  setLocalStorageItem(key: string, value: any) {
    localStorage.setItem(`${this.STORAGE_KEY}${key}`, JSON.stringify(value));
  }

  getLocalStorageItem(key: string) {
    return localStorage.getItem(`${this.STORAGE_KEY}${key}`)
      ? JSON.parse(localStorage.getItem(`${this.STORAGE_KEY}${key}`) as any)
      : '';
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  removeLocalStorageValue(key: string) {
    localStorage.removeItem(`${this.STORAGE_KEY}${key}`);
  }

  setSessionStorageItem(key: string, value: any) {
    sessionStorage.setItem(`${this.STORAGE_KEY}${key}`, JSON.stringify(value));
  }

  getSessionStorageItem(key: string) {
    return sessionStorage.getItem(`${this.STORAGE_KEY}${key}`)
      ? JSON.parse(sessionStorage.getItem(`${this.STORAGE_KEY}${key}`) as any)
      : '';
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }

  removeSessionStorageValue(key: string) {
    sessionStorage.removeItem(key);
  }
}
