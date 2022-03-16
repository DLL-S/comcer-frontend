import { Injectable } from "@angular/core";
import { GenericState } from "src/app/core/services/states/generic.state";
import { EnumStatusPedido } from "src/app/shared/models/enums/status-pedido.enum";
import { Pedido } from "../models/pedido.model";

/**
 * Gerenciador de estado para pedidos.
 */
@Injectable()
export class PedidosState extends GenericState<Pedido> {

    /**
     * Atualiza o status de um {@link ProdutoPedido} no front end.
     * @param idProduto O id do {@link Produto} do {@link Pedido}.
     * @param novoStatus O novo status ({@link EnumStatusPedido}) do pedido.
     */
    public atualizarStatusProdutoPedido(idProduto: number, novoStatus: EnumStatusPedido) {
        const atual = this.pesquisarPorId(idProduto);
    }

    public pesquisarPorIdDoProduto(id: number) {

    }
}
