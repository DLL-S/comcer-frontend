import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from './../services/login.service';

/**
 * Guarda de rota base.
 * No momento, enquanto não há controle por nível de acesso,
 * este será o único guarda de rota utilizado, ele verifica apenas
 * se o usuário está logado.
 */
@Injectable()
export class BaseGuard implements CanActivate {

    constructor (private loginService: LoginService, private router: Router) { }

    /**
     * Informa se a rota pode ser acessada ou não.
     * @param next O próximo middleware no pipeline.
     * @param state O estado atual da rota.
     * @returns Um {@link Observable} de boolean.
     */
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        // TODO: Implementar guardas com controle de acesso com base nos Roles
        if (!this.loginService.localStorage.obtenhaUsuario() && !this.loginService.localStorage.obtenhaTokenUsuario()) {
            this.loginService.logout();
            return of(false);
        }
        return of(true);
    }
}
