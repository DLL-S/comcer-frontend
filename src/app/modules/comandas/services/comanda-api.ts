import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseApi } from "src/app/core/services/base.api";
import { Comanda } from "../models/comanda.model";

/**
 * Serviço de Comanda.
 */
@Injectable()
export class ComandaApi extends BaseApi<Comanda> {

	/**
	 * Inicia uma nova instância de {@link ComandaApi}
	 * @param http O {@link HttpClient} do serviço.
	 */
	public constructor (http: HttpClient) {
		super(http, "/comanda");
	}
}
