import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/core/services/base.service";
import { Funcionario } from "../models/funcionario.model";

/**
 * Serviço de funcionários.
 */
@Injectable({
	providedIn: "root"
})
export class FuncionariosApi extends BaseService {

	/**
	 * Inicia uma nova instância de {@link FuncionariosApi}
	 * @param http O {@link HttpClient} do serviço.
	 */
	constructor(private http: HttpClient) {
		super("/funcionarios");
	}

	/**
	 * Obtém uma lista de funcionários do back end
	 * de acordo com os parâmetros especificados.
	 * @param search A string de consulta.
	 * @returns Um {@link Observable} contendo os dados da resposta.
	 */
	listar(search: string): Observable<Funcionario[]> {
		return this.http.get<Funcionario[]>(this.apiBaseUrl, this.obtenhaHeaders())
	}

	/**
	 * Cadastra um novo funcionário no back end.
	 * @param funcionario O {@link Funcionario} a ser cadastrado.
	 */
	criar(funcionario: Funcionario): Observable<Funcionario> {
		return this.http.post<Funcionario>(this.apiBaseUrl, funcionario, this.obtenhaHeaders());
	}

	/**
	 * Atualiza os dados de um funcionário no back end.
	 * @param funcionario O funcionário a ser atualizado.
	 */
	atualizar(funcionario: Funcionario): Observable<Funcionario> {
		return this.http.put<Funcionario>(this.apiBaseUrl, funcionario, this.obtenhaHeaders());
	}

	remover(id: number): Observable<any> {
		return this.http.delete(`${this.apiBaseUrl}/${id}`, this.obtenhaHeaders());
	}
}
