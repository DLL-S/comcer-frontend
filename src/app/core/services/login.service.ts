import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Usuario } from "../models/usuario.model";
import { BaseApi } from "./base-api.service";

@Injectable()
export class LoginService extends BaseApi {

	constructor (protected override http: HttpClient) {
		super(http, "/login");
	}

	login(usuario: Usuario): Observable<Usuario> {
		let response = this.http
			.post<Usuario>(this.apiBaseUrl, usuario, this.obtenhaHeaders())
			.pipe(
				map(result => {
					this.localStorage.salvarDadosLocaisUsuario(result);
					return result || {};
				})
			);

		return response;
	}
}
