import { Produto } from "src/app/modules/produtos/models/produto.model";
import { BaseModel } from "src/app/shared/models/base.model";
import { EnumStatusProdutoDoPedido } from "src/app/shared/models/enums/status-produto-pedido.enum";

/**
 * Interface padrão do Model ProdutoPedido.
 */
export interface ProdutoPedido extends BaseModel {
	produto: Produto;
	quantidade: number;
	valorUnitario: number;
	status: EnumStatusProdutoDoPedido;
	dataHoraPedido?: Date;
}
