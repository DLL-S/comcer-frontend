import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from "./core/services/login.service";
import { IsMobileState } from "./core/services/states/is-mobile.state";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

    constructor (private loginService: LoginService, private isMobileState: IsMobileState) {
        this.loginService.verificarLogin();
    }

    ngOnInit(): void {
    }

    @HostListener('window:resize', [ '$event' ])
    onResize() {
        this.isMobileState.check();
    }
}
