import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GenericFacade } from "src/app/core/services/generic.facade";
import { Funcionario } from "../models/funcionario.model";
import { FuncionariosApi } from "./funcionarios-api";
import { FuncionariosState } from "./funcionarios.state";

/**
 * Classe facade para Funcionários.
 * Faz intermédio entre os serviços de api e o estado da aplicação web.
 */
@Injectable()
export class FuncionariosFacade extends GenericFacade<Funcionario, FuncionariosApi, FuncionariosState> {

	funcionariosAtivos$: Observable<any[]>;
	funcionariosInativos$: Observable<any[]>;

	/**
	 * Inicia uma nova instância de {@link FuncionariosFacade}.
	 * @param api O serviço de api de funcionários.
	 * @param state O gerenciador de estado de funcionários.
	 */
	public constructor(
		api: FuncionariosApi,
		state: FuncionariosState
	) {
		super(api, state);
		this.funcionariosAtivos$ = this.state.funcionariosAtivos$;
		this.funcionariosInativos$ = this.state.funcionariosInativos$;
	}
}
