import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Component, OnInit } from '@angular/core';
import { Store } from "src/app/modules/states/store";
import { EnumStatusProdutoDoPedido } from "src/app/shared/models/enums/status-produto-pedido.enum";
import { PedidoViewModel } from "../../models/pedido-view.model";
import { PedidosService } from "../../services/pedidos.service";
import { ProdutosPedidosService } from "../../services/produtos-pedidos.service";

@Component({
    selector: 'app-pedidos-prontos',
    templateUrl: './pedidos-prontos.component.html',
    styleUrls: [ '../shared-styles.css' ]
})
export class PedidosProntosComponent implements OnInit {

    pedidosProntos: PedidoViewModel[] = [];

    constructor (private pedidoService: PedidosService, private produtosPedidoService: ProdutosPedidosService, private store: Store) {
        this.store.pedidosView$.subscribe({
            next: pedidos => {

                const pedidosFiltrados = pedidos.filter(pedido =>
                    pedido.statusProdutoDoPedido == EnumStatusProdutoDoPedido.Pronto);

                this.pedidosProntos = this.pedidoService.processarPedidosParaTela(this.pedidosProntos, pedidosFiltrados);
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
            this.produtosPedidoService.atualizarStatusProdutoPedido(event, EnumStatusProdutoDoPedido.Pronto);
        }
    }
}
