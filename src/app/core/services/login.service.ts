import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, take } from 'rxjs';
import { Usuario } from "../models/usuario.model";
import { BaseApi } from "./base-api.service";
import { NotificationService } from './notification.service';

@Injectable()
export class LoginService extends BaseApi {

	private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	get isLoggedIn() {
		return this.loggedIn.asObservable();
	}

	constructor (
		protected override http: HttpClient,
		private router: Router,
		private route: ActivatedRoute,
		private notificationService: NotificationService,
	) {
		super(http, "/login");
	}

	verificarLogin(): boolean {
		if (this.localStorage.obtenhaUsuario() && this.localStorage.obtenhaTokenUsuario()) {
			this.loggedIn.next(true);
			return true;
		}
		else {
			this.logout();
		}

		return false;
	}

	login(usuario: Usuario) {
		this.http.post<Usuario>(this.apiBaseUrl, usuario, this.obtenhaHeaders())
			.pipe(take(1))
			.subscribe(result => {
				this.localStorage.salvarDadosLocaisUsuario(result);
				this.loggedIn.next(true);
				let returnUrl = this.route.snapshot.queryParams[ 'returnUrl' ].split("?")[ 0 ];
				returnUrl && returnUrl != "/login" ? this.router.navigate([ returnUrl ]) : this.router.navigate([ '/' ]);
				this.notificationService.exibir("Login realizado com sucesso!");
			});
	}

	logout() {
		this.loggedIn.next(false);
		this.localStorage.limparDadosLocaisUsuario();
		this.router.navigate([ '/login' ],
			{
				queryParams: {
					returnUrl: this.router.url
				},
				queryParamsHandling: "merge"
			});
	}
}
