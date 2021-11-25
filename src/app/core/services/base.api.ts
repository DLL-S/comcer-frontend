import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseModel } from "src/app/shared/models/base.model";
import { GenericService } from "./generic.service";

/**
 * Classe de serviço genérico.
 */
export abstract class BaseApi<TModel extends BaseModel> extends GenericService {

	/**
	 * Inicia uma nova instância do serviço.
	 * @param http O {@link HttpClient} do serviço.
	 * @param apiBaseUrlPath O path da Api para o serviço em contexto.
	 */
	public constructor (http: HttpClient, apiBaseUrlPath: string) {
		super(http, apiBaseUrlPath);
	}

	/**
	 * Obtém uma lista dos objetos do back end de acordo com os parâmetros especificados.
	 * @param termoDeBusca A string de consulta.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	public pesquisar(termoDeBusca: string): Observable<TModel[]> {
		if (termoDeBusca.length > 0)
			return this.http.get<TModel[]>(`${ this.apiBaseUrl }?nome=${ termoDeBusca }`, this.obtenhaHeaders());
		return this.http.get<TModel[]>(this.apiBaseUrl, this.obtenhaHeaders());
	}

	/**
	 * Pesquisa um objeto no back end pelo Id.
	 * @param id O id de consulta.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	public pesquisarPorId(id: number): Observable<TModel> {
		return this.http.get<TModel>(`${ this.apiBaseUrl }/${ id }`, this.obtenhaHeaders());
	}

	/**
	 * Cadastra um novo objeto no back end.
	 * @param objeto O objeto a ser cadastrado.
	 */
	public criar(objeto: TModel): Observable<TModel> {
		return this.http.post<TModel>(this.apiBaseUrl, objeto, this.obtenhaHeaders());
	}

	/**
	 * Atualiza os dados de um objeto no back end.
	 * @param objeto O objeto a ser atualizado.
	 */
	public atualizar(objeto: TModel): Observable<TModel> {
		return this.http.put<TModel>(this.apiBaseUrl, objeto, this.obtenhaHeaders());
	}

	/**
	 * Remove um objeto no back end.
	 * @param id O id do objeto a ser removido.
	 * @returns O status Http informa se a operação falhou ou executou.
	 */
	public remover(id: number): Observable<any> {
		return this.http.delete(`${ this.apiBaseUrl }/${ id }`, this.obtenhaHeaders());
	}
}
