import { Pedido } from "src/app/modules/pedidos/models/pedido.model";
import { BaseModel } from "src/app/shared/models/base.model";
import { EnumStatusComanda } from "../enums/status-comanda.enum";

/**
 * Interface padrão do Model Comanda.
 */
export interface Comanda extends BaseModel {
	nome: string;
	listaDePedidos: Pedido[];
	valor: number;
	status: EnumStatusComanda;
}
