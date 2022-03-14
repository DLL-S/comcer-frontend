import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from "./core/services/login.service";
import { IsMobileState } from "./core/services/states/is-mobile.state";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

    constructor (private loginService: LoginService, private isMobileState: IsMobileState) { }

    ngOnInit(): void {
        if (this.loginService.localStorage.obtenhaUsuario() && this.loginService.localStorage.obtenhaTokenUsuario())
            this.loginService.loggedIn.next(true);
        else {
            this.loginService.logout();
        }
    }

    @HostListener('window:resize', [ '$event' ])
    onResize() {
        this.isMobileState.check();
    }
}
