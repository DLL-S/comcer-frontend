import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { GenericState } from "src/app/core/services/generic.state";
import { EnumSituacaoUsuario } from "src/app/shared/models/enums/situacao.enum";
import { Funcionario } from "../models/funcionario.model";

/**
 * Gerenciador de estado para funcionários.
 */
@Injectable()
export class FuncionariosState extends GenericState<Funcionario> {

	/**
	 * Lista todos os funcionários ativos na state.
	 */
	public get funcionariosAtivos$(): Observable<Funcionario[]> {
		return this.state.pipe(
			map(funcionarios => funcionarios.filter(x => x.situacao == EnumSituacaoUsuario.Ativo))
		);
	}

	/**
	 * Lista todos os funcionários inativos na state.
	 */
	public get funcionariosInativos$(): Observable<Funcionario[]> {
		return this.state.pipe(
			map(funcionarios => funcionarios.filter(x => x.situacao == EnumSituacaoUsuario.Inativo))
		);
	}

	/**
	 * Define a {@link EnumSituacaoUsuario} de um {@link Funcionario}.
	 * @param id O Id do {@link Funcionario} a ser atualizado.
	 * @param situacao A nova situação do {@link Funcionario}.
	 * @returns O {@link Funcionario} atualizado ou null caso o id não seja encontrado.
	 */
	public trocarSituacaoDoFuncionario(id: number, situacao: EnumSituacaoUsuario): Funcionario | null {
		const funcionarioAtual = this.pesquisarPorId(id);

		if (funcionarioAtual) {
			const indice = this.objetos.indexOf(funcionarioAtual);
			this.objetos[indice] = {
				...funcionarioAtual, situacao
			}
			this.objetos = [...this.objetos];
			return this.objetos[indice];
		}

		return null;
	}
}
