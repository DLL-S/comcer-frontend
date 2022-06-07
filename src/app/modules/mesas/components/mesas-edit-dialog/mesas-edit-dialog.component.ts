import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { take } from "rxjs";
import { NotificationService } from "src/app/core/services/notification.service";
import { Mesa } from './../../models/mesa.model';
import { MesaService } from './../../services/mesa.service';

@Component({
	selector: 'app-mesas-edit-dialog',
	templateUrl: './mesas-edit-dialog.component.html',
	styleUrls: [ './mesas-edit-dialog.component.css' ]
})
export class MesasEditDialogComponent implements OnInit {

	formMesa: FormGroup;
	private formSubmitAttempt: boolean = false;


	constructor (
		private formBuilder: FormBuilder,
		private mesaService: MesaService,
		private notificationService: NotificationService,
		public dialogRef: MatDialogRef<MesasEditDialogComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: Mesa
	) {
		this.formMesa = this.formBuilder.group({
			id: [ { value: this.data?.id, disabled: true }, [ Validators.required ] ],
			numero: [ this.data?.numero, [ Validators.required, Validators.min(1) ] ],
			disponivel: [ this.data?.disponivel || false, [ Validators.required ] ]
		});
	}

	ngOnInit(): void {
	}

	isFieldInvalid(field: string) {
		return (
			(!this.formMesa.get(field)?.valid && this.formMesa.get(field)?.touched) ||
			(this.formMesa.get(field)?.untouched && this.formSubmitAttempt)
		);
	}

	concluir() {
		let mesaEditada: Mesa = this.formMesa.value;

		if (this.data) {
			mesaEditada.id = this.formMesa.get("id")?.value;
			this.mesaService.atualizar(mesaEditada)
				.pipe(take(1))
				.subscribe({
					next: result => {
						mesaEditada = result;
						this.mesaService.atualizaState(mesaEditada);
						this.notificationService.exibir(`Mesa ${ mesaEditada.numero } atualizado com sucesso!`);

						this.dialogRef.close({
							confirmacao: true,
						});
					}
				});
		}
		else {
			this.mesaService.criar(mesaEditada)
				.pipe(take(1))
				.subscribe({
					next: result => {
						mesaEditada = result,
							this.mesaService.adicionaState(mesaEditada);
						this.notificationService.exibir(`Mesa cadastrado com o ID ${ mesaEditada.id }!`);

						this.dialogRef.close();
					}
				});
		}
	}

	cancelar() {
		this.dialogRef.close();
	}
}
