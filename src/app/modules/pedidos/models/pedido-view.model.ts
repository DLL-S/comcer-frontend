import { EnumStatusComanda } from "src/app/shared/models/enums/status-comanda.enum";
import { EnumStatusProdutoDoPedido } from "src/app/shared/models/enums/status-produto-pedido.enum";

export interface PedidoViewModel {
	idComanda: number;
	numeroMesa: number;
	nomeComanda: string;
	valorTotalComanda: number;
	statusComanda: EnumStatusComanda;
	idDoProdutoDoPedido: number;
	nomeProdutoDoPedido: string;
	descricaoProdutoDoPedido: string;
	precoProdutoDoPedido: number;
	fotoProdutoDoPedido: string;
	quantidadeProdutoDoPedido: number;
	statusProdutoDoPedido: EnumStatusProdutoDoPedido;
	dataHoraPedido?: Date;
	observacao?: string;
}
