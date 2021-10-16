import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FuncionariosApi } from "./api/funcionarios-api";
import { Funcionario } from "./models/funcionario.model";
import { FuncionariosState } from "./state/funcionarios.state";

/**
 * Classe facade para Funcionários.
 * Faz intermédio entre os serviços de api e o estado da aplicação web.
 */
@Injectable()
export class FuncionariosFacade {

	funcionarios$: Observable<any[]>;

	constructor(
		private api: FuncionariosApi,
		private state: FuncionariosState
	) {
		this.api.listar("").subscribe(funcionarios => this.state.funcionarios = funcionarios);
		this.funcionarios$ = this.state.funcionarios$;
	}

	adicionaFuncionario(funcionario: Funcionario) {
		this.state.cadastrarNovoFuncionario(funcionario);

		this.api.criar(funcionario).subscribe({
			next: funcionarioCadastrado => this.state.atualizarFuncionario(funcionarioCadastrado),
			error: erro => this.state.removerFuncionario(funcionario.id)
		})
	}
}
