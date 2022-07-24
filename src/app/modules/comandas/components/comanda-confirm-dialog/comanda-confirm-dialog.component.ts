import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comanda } from '../../models/comanda.model';

@Component({
	selector: 'app-comanda-confirm-dialog',
	templateUrl: './comanda-confirm-dialog.component.html',
	styleUrls: [ './comanda-confirm-dialog.component.css' ]
})
export class ComandaConfirmDialogComponent {

	dados: Comanda;

	constructor (
		public dialogRef: MatDialogRef<ComandaConfirmDialogComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: Comanda
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
