import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { LoginService } from './../../../services/login.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: [ './header.component.css' ]
})
export class HeaderComponent implements OnInit {

	isLoggedIn$: Observable<boolean> = of(true);

	constructor (private loginService: LoginService) { }

	ngOnInit(): void {
		this.isLoggedIn$ = this.loginService.isLoggedIn;
	}

	onLogout() {
		this.loginService.logout();
	}

}
