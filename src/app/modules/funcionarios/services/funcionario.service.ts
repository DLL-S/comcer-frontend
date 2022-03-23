import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
import { GenericApi } from 'src/app/core/services/generic-api.service';
import { NotificationService } from "src/app/core/services/notification.service";
import { EnumSituacaoUsuario } from "src/app/shared/models/enums/situacao.enum";
import { FuncionariosState } from "../state/funcionarios-state";
import { ResponseModel } from './../../../core/models/response.model';
import { Funcionario } from './../models/funcionario.model';

@Injectable()
export class FuncionarioService extends GenericApi<Funcionario> {

	/**
	 * Inicia uma nova instância de {@link FuncionarioService}
	 * @param http O {@link HttpClient} do serviço.
	 */
	constructor (http: HttpClient, private state: FuncionariosState, private notificationService: NotificationService) {
		super(http, "/funcionarios");
	}

	/**
	 * Obtém uma lista de {@link Funcionario} da API.
	 */
	public listaDeFuncionarios$ = this.http
		.get<ResponseModel<Funcionario>>(this.apiBaseUrl, this.obtenhaHeaderAuth())
		.pipe(
			tap(next => {
				this.state.set(next.resultados, "funcionarios");
			})
		);

	/**
	 * Altera o status de um {@link Funcionario}.
	 * @param funcionario O {@link Funcionario} a ser manipulado.
	 */
	alternarSituacao(funcionario: Funcionario) {

		this.http.patch<number>(`${ this.apiBaseUrl }/${ funcionario.id }/situacao`, null, this.obtenhaHeaderAuth())
			.subscribe({
				next: result => {
					funcionario.situacao = result;
					this.atualizaState(funcionario);
					this.notificationService.exibir(`Funcionário ${ funcionario.id }: ${ EnumSituacaoUsuario[ result ] } `);
				}
			});
	}

	private atualizaState(funcionarioAtualizado: Funcionario) {
		const stateValue = this.state.value.funcionarios;

		const funcionarios = stateValue.map((funcionarioState: Funcionario) => {
			if (funcionarioAtualizado.id == funcionarioState.id)
				return { ...funcionarioState, ...funcionarioAtualizado };
			else
				return funcionarioState;
		});

		this.state.set(funcionarios, "funcionarios");
	}
}
