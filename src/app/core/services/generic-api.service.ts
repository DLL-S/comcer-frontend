import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { BaseModel } from "src/app/shared/models/base.model";
import { BaseApi } from "./base-api.service";

/**
 * Classe de serviço genérico.
 */
export abstract class GenericApi<TModel extends BaseModel> extends BaseApi {

	/**
	 * Inicia uma nova instância do serviço.
	 * @param http O {@link HttpClient} do serviço.
	 * @param apiBaseUrlPath O path da Api para o serviço em contexto.
	 */
	public constructor (http: HttpClient, apiBaseUrlPath: string) {
		super(http, apiBaseUrlPath);
	}

	/**
	 * Obtém uma lista dos objetos do back end.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	public listar(): Observable<TModel[]> {
		var response: Observable<ResponseModel> = this.http.get<ResponseModel>(this.apiBaseUrl, this.obtenhaHeaderAuth());
		return this.extrairDados(response);
	}

	/**
	 * Pesquisa um objeto no back end pelo Id.
	 * @param id O id de consulta.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	public pesquisarPorId(id: number): Observable<TModel> {
		var response: Observable<ResponseModel> = this.http.get<ResponseModel>(`${ this.apiBaseUrl }/${ id }`, this.obtenhaHeaderAuth());
		return this.extrairDados(response);
	}

	/**
	 * Cadastra um novo objeto no back end.
	 * @param objeto O objeto a ser cadastrado.
	 */
	public criar(objeto: TModel): Observable<TModel> {
		var response: Observable<ResponseModel> = this.http.post<ResponseModel>(this.apiBaseUrl, objeto, this.obtenhaHeaderAuth());
		return this.extrairDados(response);
	}

	/**
	 * Atualiza os dados de um objeto no back end.
	 * @param objeto O objeto a ser atualizado.
	 */
	public atualizar(objeto: TModel): Observable<TModel> {
		var response: Observable<ResponseModel> = this.http.put<ResponseModel>(this.apiBaseUrl, objeto, this.obtenhaHeaderAuth());
		return this.extrairDados(response);
	}

	/**
	 * Remove um objeto no back end.
	 * @param id O id do objeto a ser removido.
	 * @returns O status Http informa se a operação falhou ou executou.
	 */
	public remover(id: number): Observable<any> {
		var response: Observable<any> = this.http.delete(`${ this.apiBaseUrl }/${ id }`, this.obtenhaHeaderAuth());
		return response;
	}
}
