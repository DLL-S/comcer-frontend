import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { LoginService } from "src/app/core/services/login.service";
import { IsMobileState } from "src/app/core/services/states/is-mobile.state";
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
    items: {
        itensPrincipais: { label: string, icon: string, url: string; }[],
        itensCadastro: { label: string, icon: string, url: string; }[];
    };


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

        this.items = {
            itensPrincipais: [
                { label: "Pedidos", icon: "fas fa-utensils", url: "/" },
                { label: "Comandas", icon: "fas fa-receipt", url: "/comandas" }
            ],
            itensCadastro: [
                { label: "Mesas", icon: "fas fa-table", url: "/mesas" },
                { label: "Produtos", icon: "fas fa-box", url: "/produtos" },
                { label: "Funcionários", icon: "fas fa-address-card", url: "/funcionarios" },
            ]
        };
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