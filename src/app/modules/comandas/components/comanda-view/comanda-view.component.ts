import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Pedido } from 'src/app/modules/pedidos/models/pedido.model';
import { EnumStatusProdutoDoPedido } from './../../../../shared/models/enums/status-produto-pedido.enum';
import { Comanda } from './../../models/comanda.model';
import { ComandasService } from './../../services/comandas.service';

@Component({
	selector: 'app-comanda-view',
	templateUrl: './comanda-view.component.html',
	styleUrls: [ './comanda-view.component.css' ]
})
export class ComandaViewComponent implements OnInit {

	constructor (private comandaService: ComandasService,
		private notificationService: NotificationService,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: Comanda
	) { }

	ngOnInit(): void {
		console.log(this.data);
	}

	getStatusProdutoPedido(status: EnumStatusProdutoDoPedido) {
		return EnumStatusProdutoDoPedido[ status ];
	}

	getValorToral(pedido: Pedido) {
		return pedido.produtosDoPedido.reduce((partialSum, a) => partialSum + (a.valorUnitario * a.quantidade), 0);
	}
}
