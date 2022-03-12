import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LoginService } from './../services/login.service';

@Injectable()
export class BaseGuard implements CanActivate {

    private localStorageUtils = new LocalStorageService();

    constructor (private loginService: LoginService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // TODO: Implementar guardas com controle de acesso
        return of(false);
    }
}
