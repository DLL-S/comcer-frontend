import { BaseModel } from "src/app/shared/models/base.model";
import { EnumStatusPedido } from "src/app/shared/models/enums/status-pedido.enum";
import { Produto } from "src/app/shared/models/temp/produto.model";

/**
 * Interface padrão do Model Pedido.
 */
export interface Pedido extends BaseModel {
	produto: Produto;
	quantidade: number;
	valorUnitario: number;
	status: EnumStatusPedido;
	dataHoraPedido?: Date;
}