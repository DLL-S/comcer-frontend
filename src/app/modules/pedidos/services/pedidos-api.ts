import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { BaseApi } from "src/app/core/services/base.api";
import { EnumStatusPedido } from "src/app/shared/models/enums/status-pedido.enum";
import { environment } from "src/environments/environment";
import { Comanda } from "../../comandas/models/comanda.model";
import { PedidoViewModel } from "../models/pedido-view.model";
import { Pedido } from "../models/pedido.model";

/**
 * Serviço de Pedidos.
 */
@Injectable()
export class PedidosApi extends BaseApi<Pedido> {

	/**
	 * Inicia uma nova instância de {@link PedidosApi}
	 * @param http O {@link HttpClient} do serviço.
	 */
	public constructor (http: HttpClient) {
		super(http, "/pedidos");
	}

	public listarPorComanda(): Observable<PedidoViewModel[]> {
		var urlEndpointComanda = environment.apiUrl + "/comanda";
		var response: Observable<ResponseModel> = this.http.get<ResponseModel>(urlEndpointComanda, this.obtenhaHeaderAuth());
		var result: Observable<Comanda[]> = this.extrairDados(response);

		var resultadoConvertido = this.convertaComandasEmPedidoViewModel(result);
		return resultadoConvertido;
	}

	public atualizarStatusProdutoPedido(idProduto: number, novoStatus: number) {
		var urlEndpoint = `${ environment.apiUrl }/ProdutosDoPedido/${ idProduto }/?status=${ novoStatus }`;
		console.log(urlEndpoint);
		var response: Observable<ResponseModel> = this.http.put<ResponseModel>(urlEndpoint, this.obtenhaHeaderAuth());
		this.extrairDados(response);
	}

	private convertaComandasEmPedidoViewModel(result: Observable<Comanda[]>): Observable<PedidoViewModel[]> {
		var pedidosViewList: PedidoViewModel[] = new Array<PedidoViewModel>();

		result.subscribe(comandas => {
			comandas.forEach(comanda => {
				comanda.listaPedidos.forEach(pedido => {
					pedido.produtosDoPedido.forEach(item => {
						let pedido: PedidoViewModel = {
							idComanda: comanda.id,
							nomeComanda: comanda.nome,
							valorTotalComanda: comanda.valor,
							statusComanda: comanda.status,
							idDoProdutoDoPedido: item.produto.id,
							nomeProdutoDoPedido: item.produto.nome,
							descricaoProdutoDoPedido: item.produto.descricao,
							precoProdutoDoPedido: item.valorUnitario,
							fotoProdutoDoPedido: item.produto.foto,
							quantidadeProdutoDoPedido: item.quantidade,
							statusProdutoDoPedido: EnumStatusPedido[ item.status ],
							dataHoraPedido: item.dataHoraPedido
						};
						pedidosViewList.push(pedido);
					});
				});

			});
		});

		return of(pedidosViewList);
	}
}
