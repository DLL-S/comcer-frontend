import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Paginacao } from "src/app/core/models/paginacao.model";
import { ColunasParaTabela } from 'src/app/core/models/tabela-headers.model';

@Component({
	selector: 'app-base-table',
	templateUrl: './base-table.component.html',
	styleUrls: [ './base-table.component.css' ]
})
export class BaseTableComponent implements OnInit {

	@Input() lazyLoad: boolean;
	@Input() colunas?: ColunasParaTabela;
	@Input() dados$: Observable<unknown[]>;
	@Input() carregando$?: Observable<boolean>;
	@Input() paginacao: boolean;
	@Input() qtdeLinhas: number;
	@Input() destacarLinha: boolean;
	@Input() dadoChave: string;
	@Input() camposDoFiltro: string[];
	@Input() exibirBotaoNovo: boolean;
	@Input() exibirBotaoRecarregar: boolean;
	@Output() eventoDeCarregamento: EventEmitter<Paginacao>;
	@Output() eventoDePesquisa: EventEmitter<Observable<string>>;
	@Output() eventoDeRecarregamento: EventEmitter<unknown>;
	@Output() eventoDeFormDeEdicao: EventEmitter<unknown>;
	@Output() eventoDeInativacao: EventEmitter<number>;

	constructor () {
		this.lazyLoad = false;
		this.dados$ = new Observable<unknown[]>();
		this.paginacao = true;
		this.qtdeLinhas = 5;
		this.destacarLinha = true;
		this.dadoChave = "";
		this.camposDoFiltro = [ '' ]; // TODO remover se não for usar mesmo
		this.exibirBotaoNovo = false;
		this.exibirBotaoRecarregar = false;

		this.eventoDeCarregamento = new EventEmitter<Paginacao>();
		this.eventoDePesquisa = new EventEmitter<Observable<string>>();
		this.eventoDeRecarregamento = new EventEmitter();
		this.eventoDeFormDeEdicao = new EventEmitter();
		this.eventoDeInativacao = new EventEmitter();
	}

	ngOnInit(): void {
	}

	carregarDados(event$: any): void {
		let pagina: Paginacao = new Paginacao(event$.sortField, event$.first, event$.rows, event$.sortOrder);
		this.eventoDeCarregamento.emit(pagina);
	}

	dispararPesquisa(termoDeBusca: string): void {
		this.eventoDePesquisa.emit(of(termoDeBusca));
	}

	dispararRecarregamento(): void {
		this.eventoDeRecarregamento.emit();
	}

	dispararFormDeEdicao(linha: unknown): void {
		this.eventoDeFormDeEdicao.emit(linha);
	}

	dispararInativacao(id: number): void {
		this.eventoDeInativacao.emit(id);
	}
}
