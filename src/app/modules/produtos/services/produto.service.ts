import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { GenericApi } from 'src/app/core/services/generic-api.service';
import { NotificationService } from "src/app/core/services/notification.service";
import { Produto } from '../models/produto.model';
import { ProdutosState } from "../state/produtos-state";

@Injectable()
export class ProdutosService extends GenericApi<Produto> {

	/**
	 * Inicia uma nova instância de {@link ProdutoService}
	 * @param http O {@link HttpClient} do serviço.
	 */
	constructor (http: HttpClient, private state: ProdutosState, private notificationService: NotificationService) {
		super(http, "/produtos");
	}

	/**
	 * Obtém uma lista de {@link Produto} da API.
	 */
	public listaDeProdutos$ = this.listaDeObjetos$.pipe(
		tap(next => {
			this.state.set(next.resultados, "produtos");
		})
	);

	listarComPaginacao(pagina: number, quantidade: number, ordem: number): Observable<ResponseModel<Produto>> {
		var response = this.http
			.get<ResponseModel<Produto>>(
				`${ this.apiBaseUrl }?pagina=${ pagina }&quantidade=${ quantidade }&ordem=${ ordem }`,
				this.obtenhaHeaderAuth()
			).pipe(
				take(1),
				tap(next => {
					this.atualizaState(next.resultados);
				}));

		return response;
	}

	/**
	 * Obtém uma lista dos produtos do back end de acordo com o termo de busca.
	 * @param termoDeBusca A string de consulta.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	public override pesquisar(termoDeBusca: string): Observable<ResponseModel<Produto>> {
		var response: Observable<ResponseModel<Produto>> = super.pesquisar(termoDeBusca)
			.pipe(
				take(1),
				tap(next => {
					this.atualizaState(next.resultados);
				})
			);

		return response;
	}

	private atualizaState(produtos: Produto[]) {
		this.state.set(produtos, "produtos");
	}
}
