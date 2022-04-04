import { HttpClient } from "@angular/common/http";
import { map, Observable, take } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { BaseApi } from "./base-api.service";

/**
 * Classe de serviço genérico.
 */
export abstract class GenericApi<TModel> extends BaseApi {

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
	public listaDeObjetos$ = this.http.get<ResponseModel<TModel>>(this.apiBaseUrl, this.obtenhaHeaderAuth());

	/**
	 * Pesquisa um objeto no back end pelo Id.
	 * @param id O id de consulta.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	public pesquisarPorId(id: number): Observable<TModel> {
		return this.http.get<ResponseModel<TModel>>(`${ this.apiBaseUrl }/${ id }`, this.obtenhaHeaderAuth()).pipe(
			map(result => {
				return result.resultados[ 0 ];
			})
		);
	}

	/**
	 * Obtém uma lista dos objetos do back end de acordo com os parâmetros especificados.
	 * @param pagina A página a ser retornada.
	 * @param quantidade A quantidade de itens a ser retornada.
	 * @param ordem A prdem de listagem dos itens.
	 * @param termoDeBusca A string de consulta.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	public pesquisar(pagina: number, quantidade: number, ordem: number, termoDeBusca?: string): Observable<ResponseModel<TModel>> {
		let url = `${ this.apiBaseUrl }?pagina=${ pagina }&quantidade=${ quantidade }&ordem=${ ordem }&termoDeBusca=${ termoDeBusca || "" }`;
		var response: Observable<ResponseModel<TModel>> = this.http.get<ResponseModel<TModel>>(url, this.obtenhaHeaderAuth());
		return response;
	}

	/**
	 * Cadastra um novo objeto no back end.
	 * @param objeto O objeto a ser cadastrado.
	 */
	public criar(objeto: TModel): Observable<TModel> {
		return this.http.post<ResponseModel<TModel>>(this.apiBaseUrl, objeto, this.obtenhaHeaderAuth()).pipe(
			take(1),
			map(result => {
				return result.resultados[ 0 ];
			})
		);
	}

	/**
	 * Atualiza os dados de um objeto no back end.
	 * @param objeto O objeto a ser atualizado.
	 */
	public atualizar(objeto: TModel): Observable<TModel> {
		return this.http.put<ResponseModel<TModel>>(this.apiBaseUrl, objeto, this.obtenhaHeaderAuth()).pipe(
			take(1),
			map(result => {
				return result.resultados[ 0 ];
			})
		);
	}

	/**
	 * Remove um objeto no back end.
	 * @param id O id do objeto a ser removido.
	 * @returns O status Http informa se a operação falhou ou executou.
	 */
	public remover(id: number): Observable<TModel> {
		var response: Observable<TModel> = this.http.delete<TModel>(`${ this.apiBaseUrl }/${ id }`, this.obtenhaHeaderAuth());
		return response;
	}

	/**
	 * Extrai os dados de uma {@link ResponseModel} para um {@link TModel}.
	 * @param response A resposta a ser analisada.
	 * @returns Um Observale de {@link TModel} ou de uma lista vazia.
	 */
	public extrairDados(response: Observable<ResponseModel<TModel>>): Observable<TModel[]> {
		return response.pipe(
			map(result => { return result.resultados || [ {} ]; })
		);
	}
}
