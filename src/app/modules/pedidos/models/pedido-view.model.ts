import { EnumStatusComanda } from "src/app/shared/models/enums/status-comanda.enum";

export interface PedidoViewModel {

	idComanda: number;
	nomeComanda: string;
	valorTotalComanda: number;
	statusComanda: EnumStatusComanda;
	idDoProdutoDoPedido: number;
	nomeProdutoDoPedido: string;
	descricaoProdutoDoPedido: string;
	precoProdutoDoPedido: number;
	fotoProdutoDoPedido: string;
	quantidadeProdutoDoPedido: number;
	statusProdutoDoPedido: string;
	dataHoraPedido?: Date;
}
