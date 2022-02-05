import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { Observable } from "rxjs";
import { isMobileState } from "src/app/core/services/is-mobile.state";
import { TitleService } from "src/app/core/services/title.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: [ "./header.component.css" ]
})
export class HeaderComponent implements OnInit {

	visibilidadeDoMenu: boolean = false;
	items: MenuItem[];
	isMobile$: Observable<boolean>;

	constructor (private titleService: TitleService, private isMobileState: isMobileState) {
		this.isMobile$ = this.isMobileState.estado$;

		this.items = [
			{
				label: "Menu",
				items: [
					{ label: "Início", icon: "fas fa-home", routerLink: "/" },
					{ label: "Funcionários", icon: "fas fa-address-card", routerLink: "/funcionarios" },
					{ label: "Pedidos", icon: "fas fa-hand-holding-usd", routerLink: "/pedidos" },
				]
			},
		];
	}

	ngOnInit(): void { }

	toggleMenu() {
		this.visibilidadeDoMenu = !this.visibilidadeDoMenu;
	}

	get titulo(): string {
		return this.titleService.headerData.tituloNoHeader;
	}

	get url(): string {
		return this.titleService.headerData.url;
	}
}
