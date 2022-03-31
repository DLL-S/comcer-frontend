import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { GenericApi } from "src/app/core/services/generic-api.service";
import { PedidoViewModel } from '../models/pedido-view.model';
import { Pedido } from '../models/pedido.model';
import { PedidosState } from "../state/pedidos-state";

/**
 * Serviço de Pedidos.
 */
@Injectable()
export class PedidosService extends GenericApi<Pedido> {

    /**
     * Inicia uma nova instância de {@link PedidosService}
     * @param http O {@link HttpClient} do serviço.
     */
    constructor (http: HttpClient, private state: PedidosState) {
        super(http, "/pedidos");
    }

    /**
     * Obtém a lista da View de pedidos do backend.
     */
    public listaDeProdutosPorPedido$ = this.http
        .get<ResponseModel<PedidoViewModel>>(`${ this.apiBaseUrl }/ComandaView`, this.obtenhaHeaderAuth())
        .pipe(
            tap(next => {
                this.state.set(next.resultados, "pedidosView");
            })
        );

    /**
     * Processa um array de itens do store com base no status do pedido
     *  para um array específico de um componente de exibição.
     * @param pedidosTela O array de pedidos serem exibidos na tela.
     * @param pedidosFiltrados O array do store filtrado por status de acordo com a tela.
     * @returns O array da tela atualizado com os itens do array do store sem alterar o índice.
     */
    public processarPedidosParaTela(pedidosTela: PedidoViewModel[], pedidosFiltrados: PedidoViewModel[]) {
        if (pedidosTela.length == 0)
            pedidosTela = pedidosFiltrados;
        else {
            pedidosFiltrados.map(item => {
                const index = pedidosTela.findIndex(x => x.idDoProdutoDoPedido == item.idDoProdutoDoPedido);
                if (index >= 0) {
                    pedidosTela[ index ] = item;
                }
                else {
                    pedidosTela.push(item);
                }
            });
        }

        pedidosTela = pedidosTela.filter(x =>
            pedidosFiltrados.find(y => y.idDoProdutoDoPedido == x.idDoProdutoDoPedido));

        return pedidosTela;
    }
}
