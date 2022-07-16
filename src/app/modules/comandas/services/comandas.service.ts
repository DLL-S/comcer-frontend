import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, take, tap } from "rxjs";
import { ResponseModel } from 'src/app/core/models/response.model';
import { GenericApi } from "src/app/core/services/generic-api.service";
import { ComandasState } from '../state/comandas-state';
import { Comanda } from './../models/comanda.model';

/**
 * Serviço de Pedidos.
 */
@Injectable()
export class ComandasService extends GenericApi<Comanda> {

	/**
	 * Inicia uma nova instância de {@link ComandasService}
	 * @param http O {@link HttpClient} do serviço.
	 */
	constructor (http: HttpClient, private state: ComandasState) {
		super(http, "/comanda");
	}

	/**
	 * Obtém a lista da View de pedidos do backend.
	 */
	public listaDeComandas$ = this.listaDeObjetos$.pipe(
		tap(next => {
			this.state.set(next.resultados, "comandas");
		})
	);

	/**
	 * Obtém uma lista das comandas do back end de acordo com os parâmetros especificados.
	 * @param pagina A página a ser retornada.
	 * @param quantidade A quantidade de itens a ser retornada.
	 * @param ordem A prdem de listagem dos itens.
	 * @param termoDeBusca A string de consulta.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	public override pesquisar(pagina: number, quantidade: number, ordem: number): Observable<ResponseModel<Comanda>> {
		var result = super.pesquisar(pagina, quantidade, ordem)
			.pipe(
				take(1),
				tap(next =>
					this.state.set(next?.resultados, "comandas"))
			);

		return result;
	}

	public atualizaState(comandaAtualizado: Comanda) {
		const stateValue = this.state.value.comandas;

		const comandas = stateValue.map((comandaState: Comanda) => {
			if (comandaAtualizado.id == comandaState.id)
				return { ...comandaState, ...comandaAtualizado };
			else
				return comandaState;
		});

		this.state.set(comandas, "comandas");
	}

	public adicionaState(comanda: Comanda) {
		this.state.adicionar(comanda, "comandas");
	}
}
