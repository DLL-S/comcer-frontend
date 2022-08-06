import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, OnDestroy } from '@angular/core';
import { SubscriptionContainer } from "src/app/core/helpers/subscription-container";
import { EnumStatusProdutoDoPedido } from "src/app/shared/models/enums/status-produto-pedido.enum";
import { PedidoViewModel } from "../../models/pedido-view.model";
import { PedidosService } from "../../services/pedidos.service";
import { ProdutosPedidosService } from "../../services/produtos-pedidos.service";
import { PedidosState } from "../../state/pedidos-state";

@Component({
	selector: 'app-pedidos-cozinhando',
	templateUrl: './pedidos-cozinhando.component.html',
	styleUrls: [ '../shared-styles.css' ]
})
export class PedidosCozinhandoComponent implements OnDestroy {

	@Input() carregando: boolean = true;
	pedidosCozinhando: PedidoViewModel[] = [];
	private subscriptions = new SubscriptionContainer();


	constructor (private pedidoService: PedidosService, private produtosPedidoService: ProdutosPedidosService, private state: PedidosState) {
		this.subscriptions.add = this.state.pedidosView$.subscribe({
			next: pedidos => {

				const pedidosFiltrados = pedidos.filter(pedido =>
					pedido.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Cozinhando);

				this.pedidosCozinhando = this.pedidoService.processarPedidosParaTela(this.pedidosCozinhando, pedidosFiltrados);
			}
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.dispose();
	}

	drop(event: CdkDragDrop<PedidoViewModel[]>) {

		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		}
		else {
			this.produtosPedidoService.atualizarStatusProdutoPedido(event, EnumStatusProdutoDoPedido.Cozinhando);
		}
	}

	podeAtualizar(value: boolean = true) {
		this.pedidoService.podeAtualizarListas = value;
	}
}
