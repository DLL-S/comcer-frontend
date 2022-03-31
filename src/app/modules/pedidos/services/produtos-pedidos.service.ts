import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { take } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { GenericApi } from "src/app/core/services/generic-api.service";
import { NotificationService } from '../../../core/services/notification.service';
import { EnumStatusProdutoDoPedido } from '../../../shared/models/enums/status-produto-pedido.enum';
import { PedidoViewModel } from '../models/pedido-view.model';
import { ProdutoPedido } from '../models/produto-pedido.model';
import { PedidosState } from "../state/pedidos-state";

/**
 * Serviço de Produtos de Pedidos.
 */
@Injectable()
export class ProdutosPedidosService extends GenericApi<ProdutoPedido> {

	/**
	 * Inicia uma nova instância de {@link PedidosApi}
	 * @param http O {@link HttpClient} do serviço.
	 */
	constructor (http: HttpClient, private notificationService: NotificationService, private state: PedidosState) {
		super(http, "/produtosdopedido");
	}

	/**
	 * Atualiza o status de um {@link ProdutoPedido} no back end.
	 * @param event O {@link CdkDragDrop} evento contendo os dados da movimentação do item na tela.
	 * @param novoStatus O novo status do pedido.
	 */
	public atualizarStatusProdutoPedido(event: CdkDragDrop<PedidoViewModel[]>, novoStatus: EnumStatusProdutoDoPedido) {

		transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
		let pedidoAtualizado = event.container.data[ event.currentIndex ];
		pedidoAtualizado.statusProdutoDoPedido = novoStatus;

		var urlEndpoint = `${ this.apiBaseUrl }/${ pedidoAtualizado.idDoProdutoDoPedido }?status=${ novoStatus }`;

		this.http.put<ResponseModel<ProdutoPedido>>(urlEndpoint, null, this.obtenhaHeaderAuth())
			.pipe(take(1))
			.subscribe({
				next: result => {
					const stateValue = this.state.value.pedidosView;

					const pedidosView = stateValue.map((pedido: PedidoViewModel) => {
						if (pedidoAtualizado.idDoProdutoDoPedido == pedido.idDoProdutoDoPedido)
							return { ...pedido, ...pedidoAtualizado };
						else
							return pedido;
					});

					this.state.set(pedidosView, "pedidosView");
					this.notificationService.exibir(`${ result.resultados[ 0 ].id } - ${ result.resultados[ 0 ].produto.nome }: ${ EnumStatusProdutoDoPedido[ result.resultados[ 0 ].status ] }`);
				},
				error: error => {
					pedidoAtualizado.statusProdutoDoPedido = event.previousContainer.data[ event.previousIndex ].statusProdutoDoPedido;
					transferArrayItem(event.container.data, event.previousContainer.data, event.currentIndex, event.previousIndex);
				}
			});
	}
}
