import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotificationService } from "src/app/core/services/notification.service";
import { Produto } from "../../models/produto.model";
import { ProdutoService } from "../../services/produto.service";

@Component({
	selector: 'app-produto-edit-dialog',
	templateUrl: './produto-edit-dialog.component.html',
	styleUrls: [ './produto-edit-dialog.component.css' ]
})
export class ProdutoEditDialogComponent implements OnInit {

	formProduto: FormGroup;
	private formSubmitAttempt: boolean = false;

	constructor (
		private produtoService: ProdutoService,
		private formBuilder: FormBuilder,
		private notificationService: NotificationService,
		public dialogRef: MatDialogRef<ProdutoEditDialogComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: Produto

	) {
		this.formProduto = this.construirFormProduto();
	}

	ngOnInit(): void {
	}

	isFieldInvalid(field: string) {
		return (
			(!this.formProduto.get(field)?.valid && this.formProduto.get(field)?.touched) ||
			(this.formProduto.get(field)?.untouched && this.formSubmitAttempt)
		);
	}

	private construirFormProduto(): FormGroup {
		return this.formBuilder.group({
			id: [ { value: this.data?.id, disabled: true } ],
			nome: [ this.data?.nome, [ Validators.required, Validators.minLength(3), Validators.maxLength(60) ] ],
			descricao: [ this.data?.descricao, [ Validators.required, Validators.maxLength(200) ] ],
			preco: [ this.data?.preco, [ Validators.required ] ],
			foto: [ this.data?.foto, [ Validators.required ] ]
		});
	}

	concluir() {
		let produtoEditado: Produto = this.extrairDadosDosFormularios();

		if (this.data)
			this.produtoService.atualizar(produtoEditado).subscribe({
				next: result => {
					this.produtoService.atualizaState(result);
					this.notificationService.exibir(`Produto ${ produtoEditado.id } atualizado com sucesso!`);
					this.dialogRef.close(result);
				}
			});
		else
			this.produtoService.criar(produtoEditado).subscribe({
				next: result => {
					this.produtoService.adicionaState(result);
					this.notificationService.exibir(`Produto cadastrado com o ID ${ result.id }!`);
					this.dialogRef.close(result);
				}
			});
	}

	cancelar() {
		this.dialogRef.close();
	}

	private extrairDadosDosFormularios() {

		let produtoEditado: Produto = this.formProduto.value;

		if (this.data)
			produtoEditado.id = this.data.id;

		return produtoEditado;
	}
}
