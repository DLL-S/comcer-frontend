import { BaseModel } from "src/app/shared/models/base.model";
import { ProdutoPedido } from "./produto-pedido.model";

/**
 * Interface padrão do Model Pedido.
 */
export interface Pedido extends BaseModel {
	produtosDoPedido: ProdutoPedido[];
	dataHoraPedido?: Date;
}
