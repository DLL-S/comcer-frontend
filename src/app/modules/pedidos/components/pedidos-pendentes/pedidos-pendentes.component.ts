import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from '@angular/core';
import { Store } from "src/app/modules/states/store";
import { EnumStatusProdutoDoPedido } from "src/app/shared/models/enums/status-produto-pedido.enum";
import { PedidoViewModel } from "../../models/pedido-view.model";
import { ProdutosPedidosService } from "../../services/produtos-pedidos.service";

@Component({
    selector: 'app-pedidos-pendentes',
    templateUrl: './pedidos-pendentes.component.html',
    styleUrls: [ '../shared-styles.css' ]
})
export class PedidosPendentesComponent implements OnInit {

    pedidosPendentes: PedidoViewModel[] = [];

    constructor (private produtosPedidoService: ProdutosPedidosService, private store: Store) {
        this.store.pedidosView$.subscribe({
            next: pedidos => {
                if (this.pedidosPendentes.length == 0)
                    this.pedidosPendentes = pedidos.filter(pedido => pedido.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Pendente);
                else {
                    pedidos.filter(pedido => pedido.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Pendente)
                        .map(item => {
                            const index = this.pedidosPendentes.indexOf(item);
                            if (index >= 0) {
                                this.pedidosPendentes[ index ] = item;
                            }
                        });
                }
            }
        });
    }

    ngOnInit(): void {
    }

    drop(event: CdkDragDrop<PedidoViewModel[]>) {

        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else {
            this.produtosPedidoService.atualizarStatusProdutoPedido(event, EnumStatusProdutoDoPedido.Pendente);
        }
    }
}
