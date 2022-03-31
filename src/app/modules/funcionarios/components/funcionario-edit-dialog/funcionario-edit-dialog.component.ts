import { formatDate } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { sha256 } from "js-sha256";
import { SubscriptionContainer } from "src/app/core/helpers/subscription-container";
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
export class FuncionarioEditDialogComponent implements OnInit, OnDestroy {

	formDadosPessoais: FormGroup;
	formEndereco: FormGroup;
	formUsuario: FormGroup;
	formularios = new Map<"dadosPessoais" | "endereco" | "usuario", FormGroup>();
	private formSubmitAttempt: boolean = false;
	private subscriptions = new SubscriptionContainer();

	constructor (
		private formBuilder: FormBuilder,
		private consultaCepService: ConsultaCepService,
		private funcionarioService: FuncionarioService,
		private notificationService: NotificationService,
		public dialogRef: MatDialogRef<FuncionarioEditDialogComponent>,
		@Optional() @Inject(MAT_DIALOG_DATA) public data: Funcionario
	) {
		this.formDadosPessoais = this.construirFormDadosPessoais();
		this.formEndereco = this.construirFormEndereco();
		this.formUsuario = this.construirFormUsuario();
	}

	ngOnInit(): void {
		this.formularios.set("dadosPessoais", this.formDadosPessoais);
		this.formularios.set("endereco", this.formEndereco);
		this.formularios.set("usuario", this.formUsuario);
	}

	ngOnDestroy(): void {
		this.subscriptions.dispose();
	}

	isFieldInvalid(form: "dadosPessoais" | "endereco" | "usuario", field: string) {
		return (
			(!this.formularios.get(form)?.get(field)?.valid && this.formularios.get(form)?.get(field)?.touched) ||
			(this.formularios.get(form)?.get(field)?.untouched && this.formSubmitAttempt)
		);
	}

	buscarCep() {
		if (!this.isFieldInvalid("dadosPessoais", "cep")) {
			this.subscriptions.add = this.consultaCepService.consultar(this.formEndereco.get("cep")?.value).subscribe({
				next: result => {
					this.formEndereco.get("cidade")?.setValue(result.localidade);
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

		if (this.data) {
			this.subscriptions.add = this.funcionarioService.atualizar(funcionarioEditado.funcionario)
				.subscribe({
					next: result => {
						funcionarioEditado.funcionario = result;
						this.funcionarioService.atualizaState(funcionarioEditado.funcionario);
						this.notificationService.exibir(`Funcionário ${ funcionarioEditado.funcionario.id } atualizado com sucesso!`);

						this.dialogRef.close({
							confirmacao: true,
						});
					}
				});
		}
		else {
			this.subscriptions.add = this.funcionarioService.criarFuncionario(funcionarioEditado)
				.subscribe({
					next: result => {
						funcionarioEditado.funcionario = result,
							this.funcionarioService.adicionaState(funcionarioEditado.funcionario);
						this.notificationService.exibir(`Funcionário cadastrado com o ID ${ funcionarioEditado.funcionario.id }!`);

						this.dialogRef.close({
							confirmacao: true
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
			situacao: [ this.data?.situacao || 0, Validators.required ],
			id: [ { value: this.data?.id, disabled: true }, [ Validators.required ] ],
			nome: [ this.data?.nome, [ Validators.required, Validators.minLength(3), Validators.maxLength(80) ] ],
			dataNascimento: [ this.data ? formatDate(this.data.dataNascimento, "yyyy-MM-dd", "pt") : '', [ Validators.required ] ],
			cpf: [ this.data?.cpf, [ Validators.required, cpfValidator() ] ],
			email: [ this.data?.email, [ Validators.required, Validators.maxLength(60), Validators.email ] ],
			celular: [ this.data?.celular, [ Validators.required ] ],
		});
	}

	private construirFormEndereco() {
		return this.formBuilder.group({
			cep: [ this.data?.endereco?.cep, [ Validators.required, Validators.maxLength(8) ] ],
			cidade: [ this.data?.endereco?.cidade, [ Validators.required, Validators.maxLength(40) ] ],
			estado: [ this.data?.endereco?.estado, [ Validators.required, Validators.maxLength(40) ] ],
			bairro: [ this.data?.endereco?.bairro, [ Validators.required, Validators.maxLength(60) ] ],
			rua: [ this.data?.endereco?.rua, [ Validators.required, Validators.maxLength(60) ] ],
			numero: [ this.data?.endereco?.numero, [ Validators.required ] ],
			complemento: [ this.data?.endereco?.complemento, [ Validators.maxLength(80) ] ]
		});
	}

	private construirFormUsuario() {
		return this.formBuilder.group({
			senha: [ "", [ Validators.required, Validators.minLength(8) ] ],
			// role: [ "", [ Validators.required ] ]
		});
	}

	private extrairDadosDosFormularios() {
		let funcionarioEditado: NovoFuncionario = {
			funcionario: this.formDadosPessoais.value,
			login: this.formUsuario.value
		};

		funcionarioEditado.funcionario.endereco = this.formEndereco.value;

		if (funcionarioEditado.login) {
			funcionarioEditado.login.usuario = funcionarioEditado.funcionario.email;
			funcionarioEditado.login.senha = sha256(funcionarioEditado.login.senha);
		}

		if (this.data)
			funcionarioEditado.funcionario.id = this.data.id;

		return funcionarioEditado;
	}
}
