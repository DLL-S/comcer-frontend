import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { IsMobileState } from "src/app/core/services/is-mobile.state";
import { LoginService } from "src/app/core/services/login.service";
import { TitleService } from "src/app/core/services/title.service";

@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: [ './navigator.component.css' ]
})
export class NavigatorComponent implements OnInit {

    isLoggedIn$: Observable<boolean> = of(true);
    visibilidadeDoMenu: boolean = true;
    isMobile$: Observable<boolean>;

    constructor (
        private loginService: LoginService,
        private titleService: TitleService,
        private isMobileState: IsMobileState
    ) {
        this.isMobile$ = this.isMobileState.estado$;
        this.isMobile$.subscribe(state => {
            if (state && this.visibilidadeDoMenu)
                this.toggleSideBar();
        });
    }

    ngOnInit(): void {
        this.isLoggedIn$ = this.loginService.isLoggedIn;
    }

    onLogout() {
        this.loginService.logout();
    }

    toggleSideBar() {
        this.visibilidadeDoMenu = !this.visibilidadeDoMenu;
    }

    get titulo(): string {
        return this.titleService.headerData.tituloNoHeader;
    }

    get url(): string {
        return this.titleService.headerData.url;
    }
}
