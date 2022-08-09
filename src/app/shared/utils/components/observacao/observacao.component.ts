import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/modules/pedidos/models/pedido.model';
import { PedidoViewModel } from './../../../../modules/pedidos/models/pedido-view.model';

@Component({
	selector: 'app-observacao[pedido]',
	templateUrl: './observacao.component.html',
	styleUrls: [ './observacao.component.css' ]
})
export class ObservacaoComponent implements OnInit {

	@Input() pedido!: Pedido | PedidoViewModel;

	constructor () { }

	ngOnInit(): void {
	}
}
