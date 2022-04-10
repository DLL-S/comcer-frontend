import { Component, Input, OnInit } from '@angular/core';
import { PedidoViewModel } from '../../models/pedido-view.model';

@Component({
	selector: 'app-pedidos-item',
	templateUrl: './pedidos-item.component.html',
	styleUrls: [ './pedidos-item.component.css' ]
})
export class PedidosItemComponent implements OnInit {

	@Input()
	pedido!: PedidoViewModel;

	constructor () { }

	ngOnInit(): void {
	}

}
