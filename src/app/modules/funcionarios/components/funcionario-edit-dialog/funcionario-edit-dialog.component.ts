import { formatDate } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NotificationService } from "src/app/core/services/notification.service";
import { ConsultaCepService } from "src/app/shared/utils/services/consulta-cep.service";
import { cpfValidator } from "src/app/shared/utils/valida-cpf";
import { Funcionario } from "../../models/funcionario.model";
import { NovoFuncionario } from "../../models/novo-funcionario.model";
import { FuncionarioService } from "../../services/funcionario.service";

@Component({
	selector: 'app-funcionario-edit-dialog',
	templateUrl: './funcionario-edit-dialog.component.html',
	styleUrls: [ './funcionario-edit-dialog.component.css' ]
})
export class FuncionarioEditDialogComponent implements OnInit {

	formDadosPessoais: FormGroup;
	formEndereco: FormGroup;
	formUsuario: FormGroup;
	private formSubmitAttempt: boolean = false;
	dados?: Funcionario;
	edicao: boolean = false;

	constructor (
		private formBuilder: FormBuilder,
		private consultaCepService: ConsultaCepService,
		private funcionarioService: FuncionarioService,
		private notificationService: NotificationService,
		public dialogRef: MatDialogRef<FuncionarioEditDialogComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: Funcionario
	) {
		this.dados = { ...data };

		if (this.dados)
			this.edicao = true;

		this.formDadosPessoais = this.construirFormDadosPessoais();

		this.formEndereco = this.construirFormEndereco();

		this.formUsuario = this.construirFormUsuario();
	}

	ngOnInit(): void {
	}

	isFieldInvalid(field: string) {
		return (
			(!this.formDadosPessoais.get(field)?.valid && this.formDadosPessoais.get(field)?.touched) ||
			(this.formDadosPessoais.get(field)?.untouched && this.formSubmitAttempt)
		);
	}

	buscarCep() {
		if (!this.isFieldInvalid("cep")) {
			this.consultaCepService.consultar(this.formEndereco.get("cep")?.value).subscribe({
				next: result => {
					this.formEndereco.get("cidade")?.setValue(result.logradouro);
					this.formEndereco.get("estado")?.setValue(result.uf);
					this.formEndereco.get("bairro")?.setValue(result.bairro);
					this.formEndereco.get("rua")?.setValue(result.logradouro);
					this.formEndereco.get("complemento")?.setValue(result.complemento);
				}
			});
		}
	}

	concluir() {
		let funcionarioEditado = this.extrairDadosDosFormularios();

		if (this.edicao) {
			this.funcionarioService.atualizarFuncionario(funcionarioEditado.funcionario)
				.subscribe({
					next: result => {
						funcionarioEditado.funcionario = result.resultados[ 0 ];
						this.funcionarioService.atualizaState(funcionarioEditado.funcionario);
						this.notificationService.exibir(`Funcionário ${ funcionarioEditado.funcionario.id } atualizado com sucesso!`);

						this.dialogRef.close({
							confirmacao: true,
						});
					}
				});
		}
	}

	cancelar() {
		this.dialogRef.close({
			confirmacao: false,
		});
	}

	private construirFormDadosPessoais() {
		return this.formBuilder.group({
			situacao: [ this.dados?.situacao, Validators.required ],
			id: [ { value: this.dados?.id, disabled: true }, [ Validators.required ] ],
			nome: [ this.dados?.nome, [ Validators.required, Validators.minLength(3), Validators.maxLength(80) ] ],
			dataNascimento: [ formatDate(this.dados?.dataNascimento || new Date(), "yyyy-MM-dd", "pt"), [ Validators.required ] ],
			cpf: [ this.dados?.cpf, [ Validators.required, cpfValidator() ] ],
			email: [ this.dados?.email, [ Validators.required, Validators.maxLength(60), Validators.email ] ],
			celular: [ this.dados?.celular, [ Validators.required ] ],
		});
	}

	private construirFormEndereco() {
		return this.formBuilder.group({
			cep: [ this.dados?.endereco.cep, [ Validators.required, Validators.maxLength(8) ] ],
			cidade: [ this.dados?.endereco.cidade, [ Validators.required, Validators.maxLength(40) ] ],
			estado: [ this.dados?.endereco.estado, [ Validators.required, Validators.maxLength(40) ] ],
			bairro: [ this.dados?.endereco.bairro, [ Validators.required, Validators.maxLength(60) ] ],
			rua: [ this.dados?.endereco.rua, [ Validators.required, Validators.maxLength(60) ] ],
			numero: [ this.dados?.endereco.numero, [ Validators.required ] ],
			complemento: [ this.dados?.endereco.complemento, [ Validators.maxLength(80) ] ]
		});
	}

	private construirFormUsuario() {
		return this.formBuilder.group({
			senha: [ "", [ Validators.required, Validators.minLength(8) ] ],
			role: [ "", [ Validators.required ] ]
		});
	}

	private extrairDadosDosFormularios() {
		let funcionarioEditado: NovoFuncionario = {
			funcionario: this.formDadosPessoais.value,
			login: this.formUsuario.value
		};

		funcionarioEditado.funcionario.endereco = this.formEndereco.value;

		if (this.dados)
			funcionarioEditado.funcionario.id = this.dados.id;

		return funcionarioEditado;
	}
}
