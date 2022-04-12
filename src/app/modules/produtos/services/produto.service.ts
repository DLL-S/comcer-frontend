import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { GenericApi } from 'src/app/core/services/generic-api.service';
import { NotificationService } from "src/app/core/services/notification.service";
import { Produto } from '../models/produto.model';
import { ProdutosState } from "../state/produtos-state";

@Injectable()
export class ProdutoService extends GenericApi<Produto> {

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

	/**
	 * Obtém uma lista dos produtos do back end de acordo com os parâmetros especificados.
	 * @param pagina A página a ser retornada.
	 * @param quantidade A quantidade de itens a ser retornada.
	 * @param ordem A prdem de listagem dos itens.
	 * @param termoDeBusca A string de consulta.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	public override pesquisar(pagina: number, quantidade: number, ordem: number, termoDeBusca?: string): Observable<ResponseModel<Produto>> {
		var result = super.pesquisar(pagina, quantidade, ordem, termoDeBusca)
			.pipe(
				take(1),
				tap(next => this.state.set(next?.resultados, "produtos")));
		return result;
	}

	public atualizaState(produtoAtualizado: Produto) {
		const stateValue = this.state.value.produtos;

		const produtos = stateValue.map((produtoState: Produto) => {
			if (produtoAtualizado.id == produtoState.id)
				return { ...produtoState, ...produtoAtualizado };
			else
				return produtoState;
		});

		this.state.set(produtos, "produtos");
	}

	public adicionaState(produto: Produto) {
		this.state.adicionar(produto, "produtos");
	}
}
