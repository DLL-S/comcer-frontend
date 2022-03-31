import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SubscriptionContainer } from "src/app/core/helpers/subscription-container";
import { EnumStatusProdutoDoPedido } from "src/app/shared/models/enums/status-produto-pedido.enum";
import { PedidoViewModel } from "../../models/pedido-view.model";
import { PedidosService } from "../../services/pedidos.service";
import { ProdutosPedidosService } from "../../services/produtos-pedidos.service";
import { PedidosState } from "../../state/pedidos-state";

@Component({
	selector: 'app-pedidos-pendentes',
	templateUrl: './pedidos-pendentes.component.html',
	styleUrls: [ '../shared-styles.css' ]
})
export class PedidosPendentesComponent implements OnInit, OnDestroy {

	@Input() carregando: boolean = true;
	pedidosPendentes: PedidoViewModel[] = [];
	private subscriptions = new SubscriptionContainer();

	constructor (private pedidoService: PedidosService, private produtosPedidoService: ProdutosPedidosService, private state: PedidosState) {
		this.subscriptions.add = this.state.pedidosView$.subscribe({
			next: pedidos => {

				const pedidosFiltrados = pedidos.filter(pedido =>
					pedido.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Pendente);

				this.pedidosPendentes = this.pedidoService.processarPedidosParaTela(this.pedidosPendentes, pedidosFiltrados);
			}
		});
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.subscriptions.dispose();
	}

	drop(event: CdkDragDrop<PedidoViewModel[]>) {

		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		}
		else {
			this.produtosPedidoService.atualizarStatusProdutoPedido(event, EnumStatusProdutoDoPedido.Pendente);
		}
	}
}
