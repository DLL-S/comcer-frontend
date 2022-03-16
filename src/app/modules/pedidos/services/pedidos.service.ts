import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ResponseModel } from "src/app/core/models/response.model";
import { GenericApi } from "src/app/core/services/generic-api.service";
import { environment } from "src/environments/environment";
import { NotificationService } from './../../../core/services/notification.service';
import { EnumStatusPedido } from './../../../shared/models/enums/status-pedido.enum';
import { Pedido } from './../models/pedido.model';
import { ProdutoPedido } from './../models/produto-pedido.model';

/**
 * Serviço de Pedidos.
 */
@Injectable()
export class PedidosService extends GenericApi<Pedido> {

    /**
     * Inicia uma nova instância de {@link PedidosApi}
     * @param http O {@link HttpClient} do serviço.
     */
    constructor (http: HttpClient, private notificationService: NotificationService) {
        super(http, "/pedidos");
    }

    /**
     * Atualiza o status de um {@link ProdutoPedido} no back end.
     * @param idProduto O id do {@link Produto} do {@link Pedido}.
     * @param novoStatus O novo status ({@link EnumStatusPedido}) do pedido.
     */
    public atualizarStatusProdutoPedido(idProduto: number, novoStatus: EnumStatusPedido) {
        var urlEndpoint = `${ environment.apiUrl }/ProdutosDoPedido/${ idProduto }?status=${ novoStatus }`;

        this.http.put<ResponseModel<ProdutoPedido>>(urlEndpoint, null, this.obtenhaHeaderAuth())
            .subscribe({
                next: result => {
                    this.notificationService.exibir(`$Status do produto do pedido ${ result.resultados[ 0 ].id } atualizado: ${ result.resultados[ 0 ].status }`);
                }
            });
    }
}
