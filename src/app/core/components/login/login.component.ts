import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { sha256 } from 'js-sha256';
import { Usuario } from "../../models/usuario.model";
import { AuthService } from "../../services/auth.service";
import { TitleService } from "../../services/title.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

	loginFormGroup: FormGroup;
	private formSubmitAttempt: boolean = false;

	constructor (private titleService: TitleService,
		private authService: AuthService,
		private formBuilder: FormBuilder,
	) {
		this.titleService.setTitle("Entrar", "/login", "Comanda Certa");
		this.loginFormGroup = this.formBuilder.group({
			usuario: [ "", Validators.required ],
			senha: [ "", [ Validators.required, Validators.minLength(8) ] ]
		});
	}

	ngOnInit(): void {

	}

	isFieldInvalid(field: string) {
		return (
			(!this.loginFormGroup.get(field)?.valid && this.loginFormGroup.get(field)?.touched) ||
			(this.loginFormGroup.get(field)?.untouched && this.formSubmitAttempt)
		);
	}

	onSubmit() {
		if (this.loginFormGroup.valid) {
			var usuario: Usuario = {
				usuario: this.loginFormGroup.get("usuario")?.value,
				senha: sha256(this.loginFormGroup.get("senha")?.value),
				role: "",
				token: ""
			};

			this.authService.login(usuario);
		}

		this.formSubmitAttempt = true;
	}
}
