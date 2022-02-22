import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { LocalStorageService } from "src/app/core/services/LocalStorageService";
import { environment } from "src/environments/environment";
import { ResponseModel } from "../models/response.model";

/**
 * Classe de serviço base.
 */
export abstract class GenericService {

	/**
	 * URL base para chamadas na Api.
	 */
	private _apiBaseUrl: string = environment.apiUrl;

	/**
	 * Utilitário para armazenamento e consulta de dados no LocalStorage.
	 */
	public localStorage: LocalStorageService = new LocalStorageService();

	/**
	 * Construtor que define o path da url da api.
	 * @param apiBaseUrlPath O path da Api para o serviço em contexto.
	 */
	protected constructor (protected http: HttpClient, apiBaseUrlPath: string) {
		this._apiBaseUrl += apiBaseUrlPath;
	}

	/**
	 *
	 * @returns Obtém a URL base para requisições na api.
	 */
	protected get apiBaseUrl(): string {
		return this._apiBaseUrl;
	}

	/**
	 * Otém um objeto contendo os {@linkplain HttpHeaders}.
	 * @returns Um objeto contendo os {@link HttpHeaders}.
	 */
	protected obtenhaHeaders() {
		return {
			headers: new HttpHeaders({
				"Content-Type": "application/json"
			})
		};
	}

	/**
	 * Obtém os headers, incluindo o token de autenticação.
	 * @returns Um objeto contendo os {@link HttpHeaders}.
	 */
	protected obtenhaHeaderAuth() {
		return {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${ this.localStorage.obtenhaTokenUsuario() }`
			})
		};
	}

	/**
	 * Obtém os dados da resposta Http ou um objeto vazio.
	 * @param response A resposta a ser analisada.
	 * @returns Um objeto contendo os dados da resposta.
	 */
	protected extrairDados(response: Observable<ResponseModel>): Observable<any> {
		return response.pipe(
			map(result => { return result.resultados || [ {} ]; })
		);
	}
}
