import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { take } from "rxjs";
import { PedidoViewModel } from '../../models/pedido-view.model';
import { ProdutosPedidosService } from './../../services/produtos-pedidos.service';
import { CancelConfirmDialogComponent } from './../cancel-confirm-dialog/cancel-confirm-dialog.component';

@Component({
	selector: 'app-pedidos-item[pedido]',
	templateUrl: './pedidos-item.component.html',
	styleUrls: [ './pedidos-item.component.css' ]
})
export class PedidosItemComponent implements OnInit {

	@Input() pedido!: PedidoViewModel;
	@Input() exibirCancelamento: boolean = true;


	constructor (private produtosPedidosService: ProdutosPedidosService,
		public dialog: MatDialog) { }

	ngOnInit(): void {
	}

	onCancell() {

		const dialogRef = this.dialog.open(CancelConfirmDialogComponent, {
			width: "400px",
			data: this.pedido,
		});

		dialogRef.afterClosed()
			.pipe(take(1))
			.subscribe(result => {
				if (result && result.confirmacao)
					this.produtosPedidosService.cancelarProduto(this.pedido);
			});
	}
}
