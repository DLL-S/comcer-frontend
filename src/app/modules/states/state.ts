import { Funcionario } from '../funcionarios/models/funcionario.model';
import { Mesa } from "../mesas/models/mesa.model";
import { PedidoViewModel } from '../pedidos/models/pedido-view.model';
import { Produto } from "../produtos/models/produto.model";

/**
 * Interface base para os estados da aplicação.
 */
export interface State {
	pedidosView: PedidoViewModel[];
	funcionarios: Funcionario[];
	produtos: Produto[];
	mesas: Mesa[];
}
