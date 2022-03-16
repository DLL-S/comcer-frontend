import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
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
     * Obtém uma lista dos objetos do back end de acordo com os parâmetros especificados.
     * @param termoDeBusca A string de consulta.
     * @returns Um {@link Observable} contendo os dados da resposta.
     */
    public pesquisar(termoDeBusca: string): Observable<ResponseModel<TModel>> {
        var response: Observable<ResponseModel<TModel>> = this.http.get<ResponseModel<TModel>>(
            `${ this.apiBaseUrl }?termoDeBusca=${ termoDeBusca }`, this.obtenhaHeaders());
        return response;
    }

    /**
     * Obtém uma lista dos objetos do back end.
     * @returns Um {@link Observable} contendo os dados da resposta.
     */
    public listar(): Observable<ResponseModel<TModel>> {
        var response: Observable<ResponseModel<TModel>> = this.http.get<ResponseModel<TModel>>(this.apiBaseUrl, this.obtenhaHeaderAuth());
        return response;
    }

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
     * Cadastra um novo objeto no back end.
     * @param objeto O objeto a ser cadastrado.
     */
    public criar(objeto: TModel): Observable<TModel> {
        return this.http.post<ResponseModel<TModel>>(this.apiBaseUrl, objeto, this.obtenhaHeaderAuth()).pipe(
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
     * Obtém os dados da resposta Http ou um objeto vazio.
     * @param response A resposta a ser analisada.
     * @returns Um objeto contendo os dados da resposta.
     */
    public extrairDados(response: Observable<ResponseModel<TModel>>): Observable<TModel[]> {
        return response.pipe(
            map(result => { return result.resultados || [ {} ]; })
        );
    }
}
