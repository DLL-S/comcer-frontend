import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";
import { LocalStorageUtils } from "src/app/shared/utils/LocalStorageUtils";
import { environment } from "src/environments/environment";

/**
 * Classe de serviço base.
 */
export abstract class BaseService {

	/**
	 * URL base para chamadas na Api.
	 */
	private _apiBaseUrl: string = environment.apiUrl;

	/**
	 * Utilitário para armazenamento e consulta de dados no LocalStorage.
	 */
	public localStorage = new LocalStorageUtils();

	/**
	 * Construtor que define o path da url da api.
	 * @param apiBaseUrlPath O path da Api para o serviço em contexto.
	 */
	protected constructor(protected http: HttpClient, apiBaseUrlPath: string) {
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
				'Authorization': `Bearer ${this.localStorage.obterTokenUsuario()}`
			})
		}
	}

	/**
	 * Obtém os dados da resposta Http ou um objeto vazio.
	 * @param response A resposta a ser analisada.
	 * @returns Um objeto any contendo os dados da resposta.
	 */
	protected extrairDados(response: any) {
		return response.data || {};
	}

	/**
	 * Verifica uma response por erros.
	 * @param response A response a ser analisada.
	 * @returns Uma exceção de erro, caso ocorra.
	 */
	protected serviceError(response: Response | any) {
		let customError: string[] = [];
		let customResponse = { error: { errors: [] } }

		if (response instanceof HttpErrorResponse) {

			if (response.statusText === "Unknown Error") {
				customError.push("Ocorreu um erro desconhecido");
				response.error.errors = customError;
			}
		}
		if (response.status === 500) {
			customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o administrador do sistema.");

			// Erros do tipo 500 não possuem uma lista de erros
			// A lista de erros do HttpErrorResponse é readonly
			customResponse.error.errors = customError as never;
			return throwError(() => new Error(customResponse.error.errors.toString()));
		}

		console.error(response);
		return throwError(() => response);
	}
}
