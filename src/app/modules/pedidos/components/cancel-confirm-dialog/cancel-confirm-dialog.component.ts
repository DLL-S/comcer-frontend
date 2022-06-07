import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PedidoViewModel } from './../../models/pedido-view.model';

@Component({
	selector: 'app-cancel-confirm-dialog',
	templateUrl: './cancel-confirm-dialog.component.html',
	styleUrls: [ './cancel-confirm-dialog.component.css' ]
})
export class CancelConfirmDialogComponent {

	dados: PedidoViewModel;

	constructor (
		public dialogRef: MatDialogRef<CancelConfirmDialogComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: PedidoViewModel
	) {
		this.dados = { ...data };
	}

	confirmar() {
		this.dialogRef.close({
			confirmacao: true
		});
	}

	cancelar() {
		this.dialogRef.close({
			confirmacao: false
		});
	}
}
