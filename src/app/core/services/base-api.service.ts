import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

/**
 * Classe de serviço base.
 */
export abstract class BaseApi {

	/**
	 * URL base para chamadas na Api.
	 */
	private _apiBaseUrl: string = environment.apiUrl;

	/**
	 * Construtor que define o path da url da api.
	 * @param apiBaseUrlPath O path da Api para o serviço em contexto.
	 */
	protected constructor (protected http: HttpClient, apiBaseUrlPath: string) {
		this._apiBaseUrl += apiBaseUrlPath;
	}

	/**
	 * Obtém a URL base para requisições na api.
	 * @returns A URL base para requisições na api.
	 */
	protected get apiBaseUrl(): string {
		return this._apiBaseUrl;
	}
}
