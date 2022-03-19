import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { GenericApi } from "src/app/core/services/generic-api.service";
import { Store } from "../../states/store";
import { PedidoViewModel } from './../models/pedido-view.model';
import { Pedido } from './../models/pedido.model';

/**
 * Serviço de Pedidos.
 */
@Injectable()
export class PedidosService extends GenericApi<Pedido> {

    /**
     * Inicia uma nova instância de {@link PedidosApi}
     * @param http O {@link HttpClient} do serviço.
     */
    constructor (http: HttpClient, private store: Store) {
        super(http, "/pedidos");
    }

    public listaDeProdutosPorPedido$ = this.http
        .get<ResponseModel<PedidoViewModel>>(`${ this.apiBaseUrl }/ComandaView`, this.obtenhaHeaderAuth())
        .pipe(
            tap(next => {
                this.store.set(next.resultados, "pedidosView");
            })
        );

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
