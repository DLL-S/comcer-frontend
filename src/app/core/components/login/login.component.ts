import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DynamicFormModel, DynamicFormService, DynamicInputModel } from "@ng-dynamic-forms/core";
import { Usuario } from "../../models/usuario.model";
import { LoginService } from "../../services/login.service";
import { TitleService } from '../../services/title.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	loginFormModel: DynamicFormModel;
	loginFormGroup: FormGroup;
	usuario?: Usuario;

	constructor (private titleService: TitleService,
		private formService: DynamicFormService,
		private loginService: LoginService,
		private router: Router,
		private route: ActivatedRoute,
	) {
		this.titleService.setTitle("Entrar", "/login", "Acessar a aplicação");
		this.loginFormModel = this.construirFormulario();
		this.loginFormGroup = this.formService.createFormGroup(this.loginFormModel);
	}

	ngOnInit(): void {
	}

	logar() {
		this.usuario = {
			usuario: this.formService.findModelById<DynamicInputModel>("usuario", this.loginFormModel)?.value?.toString() || "",
			senha: this.formService.findModelById<DynamicInputModel>("senha", this.loginFormModel)?.value?.toString() || "",
			role: "",
			token: ""
		};

		console.log(this.usuario);

		this.loginService.login(this.usuario)
			.subscribe(() => {
				let returnUrl = this.route.snapshot.queryParams[ 'returnUrl' ];
				returnUrl ?
					this.router.navigate([ returnUrl ])
					: this.router.navigate([ '/' ]);
			});
	}

	private construirFormulario(): DynamicFormModel {
		return [
			new DynamicInputModel({
				id: "usuario",
				maxLength: 30,
				placeholder: "Login",
				inputType: "text",
				value: "",
				validators: {
					required: null,
				},
				errorMessages: {
					required: "Por favor, informe seu usuário para acesso.",
				}
			}),

			new DynamicInputModel({
				id: "senha",
				//maxLength: 30,
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
