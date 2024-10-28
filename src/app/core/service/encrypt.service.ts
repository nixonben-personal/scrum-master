import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';

import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  storageService = inject(StorageService);

  encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, 'scrum').toString();
  }

  decryptPassword(password: string): string {
    const bytes = CryptoJS.AES.decrypt(password, 'scrum');
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
