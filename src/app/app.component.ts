import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from "./core/services/auth.service";
import { IsMobileState } from "./core/services/states/is-mobile.state";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

	constructor (private authService: AuthService, private isMobileState: IsMobileState) {
		this.authService.verificarLogin();
	}

	ngOnInit(): void {
	}

	@HostListener('window:resize', [ '$event' ])
	onResize() {
		this.isMobileState.check();
	}
}
