import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { BaseApi } from "src/app/core/services/base.api";
import { EnumStatusPedido } from "src/app/shared/models/enums/status-pedido.enum";
import { Pedido } from "../models/pedido.model";

/**
 * Serviço de Pedidos.
 */
@Injectable()
export class PedidosApi extends BaseApi<Pedido> {

	/**
	 * Inicia uma nova instância de {@link PedidosApi}
	 * @param http O {@link HttpClient} do serviço.
	 */
	public constructor (http: HttpClient) {
		super(http, "/pedidos");
	}

	/**
	 * Atualiza o status de um pedido no backend.
	 * @param id O Id do pedido.
	 * @param novoStatus O novo status do pedido.
	 * @returns Um Observable do pedido atualizado.
	 */
	public trocarStatusDoPedido(id: number, novoStatus: EnumStatusPedido): Observable<Pedido> {
		var response: Observable<ResponseModel> = this.http.put<ResponseModel>(`${ this.apiBaseUrl }/${ id }`, novoStatus, this.obtenhaHeaders());
		return this.extrairDados(response);
	}
}
