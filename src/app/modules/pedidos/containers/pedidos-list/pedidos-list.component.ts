import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import { ResponseModel } from "src/app/core/models/response.model";
import { PedidoViewModel } from "../../models/pedido-view.model";
import { PedidosService } from "../../services/pedidos.service";
import { ProdutosPedidosService } from "../../services/produtos-pedidos.service";

@Component({
    selector: 'app-pedidos-list',
    templateUrl: './pedidos-list.component.html',
    styleUrls: [ './pedidos-list.component.css' ]
})
export class PedidosListComponent implements OnInit {

    response$: Observable<ResponseModel<PedidoViewModel>>;
    pedidosPendentes$: Observable<PedidoViewModel[]>;
    pedidosCozinhando$: Observable<PedidoViewModel[]>;
    pedidosProntos$: Observable<PedidoViewModel[]>;

    constructor (
        private pedidosService: PedidosService,
        private produtosPedidoService: ProdutosPedidosService
    ) {
        this.response$ = this.pedidosService.listaDeProdutosPorPedido$;

        this.pedidosPendentes$ = this.response$.pipe(
            map(result => {
                return result.resultados/*.filter(item => item.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Pendente)*/;
            })
        );

        this.pedidosCozinhando$ = this.response$.pipe(
            map(result => {
                return result.resultados/*.filter(item => item.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Pendente)*/;
            })
        );

        this.pedidosProntos$ = this.response$.pipe(
            map(result => {
                return result.resultados/*.filter(item => item.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Pendente)*/;
            })
        );
    }

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<PedidoViewModel[] | null>) {

    }
}
