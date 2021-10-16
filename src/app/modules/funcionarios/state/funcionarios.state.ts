import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { EnumSituacaoUsuario } from "src/app/core/enums/situacao.enum";
import { Funcionario } from "../models/funcionario.model";

/**
 * Classe que gerencia o estado da aplicação web.
 */
@Injectable({
	providedIn: "root"
})
export class FuncionariosState {

	private readonly subject = new BehaviorSubject<Funcionario[]>([]);
	private state = this.subject.asObservable();

	/**
	 * Obtém o valor no estado atual.
	 */
	get funcionarios() {
		return this.subject.value;
	}

	/**
	 * Adiciona e propaga registros ao estado atual.
	 */
	set funcionarios(val: Funcionario[]) {
		this.subject.next(val);
	}

	/**
	 * Lista todos os funcionários na state.
	 */
	public get funcionarios$(): Observable<Funcionario[]> {
		return this.state.pipe(
			map(funcionarios => funcionarios)
		);
	}

	/**
	 * Consulta um {@link Funcionario} pelo id.
	 * @param id O id a ser consultado.
	 *
	 * @returns O {@link Funcionario} com o id ou undefined caso não encontre.
	 */
	public consultePorId(id: number): Funcionario | undefined {
		return this.funcionarios.find(x => x.id == id);
	}

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
	 * Adiciona um novo {@link Funcionario} na state.
	 * @param funcionario O {@link Funcionario} a ser adicionado na state.
	 * @returns O {@link Funcionario} adicionado.
	 */
	public cadastrarNovoFuncionario(funcionario: Funcionario): Funcionario {
		this.funcionarios = [...this.funcionarios, funcionario];
		return funcionario;
	}

	/**
	 * Atualiza todos os dados de um funcionário.
	 * @param funcionario O {@link Funcionario} com os dados atualizados.
	 * @returns O {@link Funcionario} atualizado ou null caso o id não seja encontrado.
	 */
	public atualizarFuncionario(funcionario: Funcionario): Funcionario | null {
		const funcionarioAtual = this.consultePorId(funcionario.id);

		if (funcionarioAtual) {
			const indice = this.funcionarios.indexOf(funcionarioAtual);
			this.funcionarios[indice] = funcionario;
			this.funcionarios = [ ...this.funcionarios ];
			return this.funcionarios[indice];
		}

		return null;
	}

	/**
	 * Remove um funcionário da state.
	 * @param id O Id do {@link Funcionario}
	 */
	public removerFuncionario(id: number): void {
		this.funcionarios = this.funcionarios.filter(x => x.id != id);
	}

	/**
	 * Define a {@link EnumSituacaoUsuario} de um {@link Funcionario}.
	 * @param id O Id do {@link Funcionario} a ser atualizado.
	 * @param situacao A nova situação do {@link Funcionario}.
	 * @returns O {@link Funcionario} atualizado ou null caso o id não seja encontrado.
	 */
	public trocarSituacaoDoFuncionario(id: number, situacao: EnumSituacaoUsuario): Funcionario | null {
		const funcionarioAtual = this.consultePorId(id);

		if (funcionarioAtual) {
			const indice = this.funcionarios.indexOf(funcionarioAtual);
			this.funcionarios[indice] = {
				...funcionarioAtual, situacao
			}
			this.funcionarios = [ ...this.funcionarios ];
			return this.funcionarios[indice];
		}

		return null;
	}
}
