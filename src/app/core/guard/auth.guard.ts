import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { Routes } from '../constants/route.constants';
@Injectable({ providedIn: 'root' })
export class AuthGuard   {
    routes=Routes
    constructor(
        private router: Router,
        private storageService: StorageService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const currentUser = this.storageService.getLocalStorageItem('currentUser');
            if (currentUser) {
                // logged in so return true
                return true;
            }
        
        // not logged in so redirect to login page with the return url
        this.router.navigate([this.routes.Loging]);
        return false;
    }
}
