import { BaseModel } from './../../../shared/models/base.model';
import { EnumStatusComanda } from './../../../shared/models/enums/status-comanda.enum';
import { Pedido } from './../../pedidos/models/pedido.model';

export interface Comanda extends BaseModel {
	nome: string;
	listaPedidos: Pedido[],
	valor: number,
	status: EnumStatusComanda;
}
