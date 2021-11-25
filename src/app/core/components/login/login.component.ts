import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { DynamicFormModel, DynamicFormService, DynamicInputModel } from "@ng-dynamic-forms/core";
import { TitleService } from '../../services/title.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	loginFormModel: DynamicFormModel;
	loginFormGroup: FormGroup;

	constructor (private titleService: TitleService, private formService: DynamicFormService) {
		this.titleService.setTitle("Entrar", "/login", "Acessar a aplicação");
		this.loginFormModel = this.construirFormulario();
		this.loginFormGroup = this.formService.createFormGroup(this.loginFormModel);
	}

	ngOnInit(): void {
	}

	logar() {
		console.log(this.formService.findModelById<DynamicInputModel>("email", this.loginFormModel)?.value);
		console.log(this.formService.findModelById<DynamicInputModel>("senha", this.loginFormModel)?.value);
	}

	private construirFormulario(): DynamicFormModel {
		return [
			new DynamicInputModel({
				id: "email",
				maxLength: 30,
				placeholder: "Login",
				inputType: "email",
				value: "",
				validators: {
					required: null,
					email: null
				},
				errorMessages: {
					required: "Por favor, informe seu e-mail de acesso.",
					email: "Por favor, informe um e-mail valido."
				}
			}),

			new DynamicInputModel({
				id: "senha",
				maxLength: 30,
				placeholder: "Senha",
				inputType: "password",
				validators: {
					required: null,
					minLength: 8
				},
				errorMessages: {
					required: "Por favor, informe sua senha de acesso.",
					minLength: "Senha deve conter no mínimo 8 caracteres."
				}
			})
		];
	}
}
