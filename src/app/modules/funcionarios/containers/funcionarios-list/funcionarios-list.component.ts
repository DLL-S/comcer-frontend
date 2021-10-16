import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { FuncionariosFacade } from "../../funcionarios-facade";
import { Funcionario } from "../../models/funcionario.model";

@Component({
	selector: "app-funcionarios-list",
	templateUrl: "./funcionarios-list.component.html",
	styleUrls: ["./funcionarios-list.component.css"]
})
export class FuncionariosListComponent implements OnInit {

	adicionaFuncionarioForm: FormGroup;
	funcionarios$: Observable<Funcionario[]> = new Observable<Funcionario[]>();

	constructor(private funcionariosFacade: FuncionariosFacade) {
		this.adicionaFuncionarioForm = new FormGroup({
			id: new FormControl(),
			nome: new FormControl(),
			cpf: new FormControl(),
			dataNascimento: new FormControl(),
			email: new FormControl(),
			celular: new FormControl(),
			situacao: new FormControl()
		})
	}

	ngOnInit(): void {
		this.funcionarios$ = this.funcionariosFacade.funcionarios$;
	}

	adicionaFuncionario() {
		let funcionario = this.adicionaFuncionarioForm.value as Funcionario;
		console.log(funcionario);
		this.funcionariosFacade.adicionaFuncionario(funcionario);
	}
}
