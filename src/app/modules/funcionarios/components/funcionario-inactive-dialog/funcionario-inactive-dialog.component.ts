import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Funcionario } from "../../models/funcionario.model";

@Component({
	selector: 'app-funcionario-inactive-dialog',
	templateUrl: './funcionario-inactive-dialog.component.html',
	styleUrls: [ './funcionario-inactive-dialog.component.css' ]
})
export class FuncionarioInactiveDialogComponent {

	dados: Funcionario;

	constructor (
		public dialogRef: MatDialogRef<FuncionarioInactiveDialogComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: Funcionario
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
