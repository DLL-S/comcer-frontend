import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ResponseModel } from "src/app/core/models/response.model";
import { GenericApi } from "src/app/core/services/generic-api.service";
import { NotificationService } from '../../../core/services/notification.service';
import { EnumStatusProdutoDoPedido } from '../../../shared/models/enums/status-produto-pedido.enum';
import { ProdutoPedido } from '../models/produto-pedido.model';

/**
 * Serviço de Produtos de Pedidos.
 */
@Injectable()
export class ProdutosPedidosService extends GenericApi<ProdutoPedido> {

    /**
     * Inicia uma nova instância de {@link PedidosApi}
     * @param http O {@link HttpClient} do serviço.
     */
    constructor (http: HttpClient, private notificationService: NotificationService) {
        super(http, "/produtosdopedido");
    }

    /**
     * Atualiza o status de um {@link ProdutoPedido} no back end.
     * @param idProduto O id do {@link Produto} do {@link Pedido}.
     * @param novoStatus O novo status ({@link EnumStatusPedido}) do pedido.
     */
    public atualizarStatusProdutoPedido(idProduto: number, novoStatus: EnumStatusProdutoDoPedido) {

        var urlEndpoint = `${ this.apiBaseUrl }/${ idProduto }?status=${ novoStatus }`;
        this.http.put<ResponseModel<ProdutoPedido>>(urlEndpoint, null, this.obtenhaHeaderAuth())
            .subscribe({
                next: result => {
                    this.notificationService.exibir(`Status do produto do pedido ${ result.resultados[ 0 ].id } atualizado: ${ result.resultados[ 0 ].status }`);
                },
                error: error => {
                    this.notificationService.exibir("Não foi possível atualizar o status do pedido");
                }
            });
    }
}
