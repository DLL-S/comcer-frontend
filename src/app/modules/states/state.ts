import { PedidoViewModel } from '../pedidos/models/pedido-view.model';
import { Produto } from "../produtos/models/produto.model";
import { Funcionario } from './../funcionarios/models/funcionario.model';

/**
 * Interface base para os estados da aplicação.
 */
export interface State {
	pedidosView: PedidoViewModel[];
	funcionarios: Funcionario[];
	produtos: Produto[];
}
