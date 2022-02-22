import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TitleService } from "src/app/core/services/title.service";
import { EnumStatusPedido } from "src/app/shared/models/enums/status-pedido.enum";
import { PedidoViewModel } from "../../models/pedido-view.model";
import { PedidosApi } from "../../services/pedidos-api";

@Component({
	selector: 'app-pedidos-list',
	templateUrl: './pedidos-list.component.html',
	styleUrls: [ './pedidos-list.component.css' ]
})
export class PedidosListComponent implements OnInit {

	pedidosView$: Observable<PedidoViewModel[]>;

	constructor (private titleService: TitleService, private pedidosApi: PedidosApi) {

		this.titleService.setTitle("Pedidos", "/pedidos");
		this.pedidosView$ = this.pedidosApi.listarPorComanda();
		this.pedidosView$.subscribe();
	}

	ngOnInit(): void {
		this.pedidosView$ = this.pedidosApi.listarPorComanda();
		this.pedidosView$.subscribe();
	}

	atualizarStatusPedido(pedido: PedidoViewModel) {
		console.log(pedido);
		var novoStatus: number = 3;

		if (pedido.statusProdutoDoPedido == EnumStatusPedido[ 1 ])
			novoStatus = 2;

		this.pedidosApi.atualizarStatusProdutoPedido(pedido.idDoProdutoDoPedido, novoStatus);
	}
}
