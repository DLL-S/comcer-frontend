import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
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
}
