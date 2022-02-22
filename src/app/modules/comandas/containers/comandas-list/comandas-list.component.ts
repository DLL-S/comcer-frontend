import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { TitleService } from "src/app/core/services/title.service";
import { Comanda } from "../../models/comanda.model";
import { ComandaApi } from "../../services/comanda-api";

@Component({
	selector: 'app-comandas-list',
	templateUrl: './comandas-list.component.html',
	styleUrls: [ './comandas-list.component.css' ]
})
export class ComandasListComponent implements OnInit {

	comandas$: Observable<Comanda[]>;

	constructor (private titleService: TitleService, private comandasApi: ComandaApi) {

		this.titleService.setTitle("Comandas", "/comandas");
		this.comandas$ = of(Array<Comanda>());
	}

	ngOnInit(): void {
		this.comandas$ = this.comandasApi.listar();
		this.comandas$.subscribe();
	}
}
