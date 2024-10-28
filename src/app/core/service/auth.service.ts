import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

import * as CryptoJS from 'crypto-js';
import { Card, Login, Signup } from '../model/common.model';
import { map, Observable, of, throwError } from 'rxjs';
import { EncryptService } from './encrypt.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  storageService = inject(StorageService);
  constructor(private cryptoService: EncryptService) {}

  signUp(data: Signup): Observable<Card[] | string> {
    try {
      const users = this.storageService.getLocalStorageItem('users')
        ? this.storageService.getLocalStorageItem('users')
        : [];

      users.push(data);

      this.storageService.setLocalStorageItem('users', users);

      return of(users);
    } catch (error) {
      return throwError(() => new Error('Failed to update local storage.'));
    }
  }

  login(data: Login): Observable<boolean | string> {
    const users = this.storageService.getLocalStorageItem('users') || [];

    return of(users).pipe(
      map((usersList) => {
        for (const user of usersList) {
          if (user.email === data.email) {
            const decryptedPassword = this.cryptoService.decryptPassword(
              user.password
            );
            if (decryptedPassword === data.password) {
              return true; // Login successful
            }
          }
        }
        throw new Error('Invalid email or password');
      })
    );
  }

  logOut(): Observable<string> {
    try {
      this.storageService.clearLocalStorage();
      return of('User logouted successfully');
    } catch (error) {
      return throwError(() => new Error('Unable to logout'));
    }
  }
}
