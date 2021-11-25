import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "src/app/core/services/base.api";
import { Funcionario } from "../models/funcionario.model";

/**
 * Serviço de funcionários.
 */
@Injectable()
export class FuncionariosApi extends BaseApi<Funcionario> {

	/**
	 * Inicia uma nova instância de {@link FuncionariosApi}
	 * @param http O {@link HttpClient} do serviço.
	 */
	public constructor(http: HttpClient) {
		super(http, "/funcionarios");
	}
}
