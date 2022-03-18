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
}
