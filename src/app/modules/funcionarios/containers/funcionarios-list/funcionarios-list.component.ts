import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Funcionario } from "../../models/funcionario.model";
import { FuncionariosFacade } from "../../services/funcionarios-facade";

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
		this.funcionariosFacade.carregarObjetos();
		this.funcionarios$ = this.funcionariosFacade.objetos$;
	}

	adicionaFuncionario() {
		let funcionario = this.adicionaFuncionarioForm.value as Funcionario;
		console.log(funcionario);
		this.funcionariosFacade.criar(funcionario);
	}
}
