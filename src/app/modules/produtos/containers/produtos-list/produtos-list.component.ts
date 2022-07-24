import { animate, state, style, transition, trigger } from "@angular/animations";
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, startWith, switchMap, take } from "rxjs";
import { SubscriptionContainer } from "src/app/core/helpers/subscription-container";
import { NotificationService } from "src/app/core/services/notification.service";
import { TitleService } from "src/app/core/services/title.service";
import { Produto } from "../../models/produto.model";
import { ProdutoService } from "../../services/produto.service";
import { ProdutosState } from "../../state/produtos-state";
import { ProdutoEditDialogComponent } from './../../components/produto-edit-dialog/produto-edit-dialog.component';

@Component({
	selector: 'app-produtos-list',
	templateUrl: './produtos-list.component.html',
	styleUrls: [ './produtos-list.component.css' ],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class ProdutosListComponent implements OnInit, OnDestroy, AfterViewInit {

	produtos: Produto[] = [];
	quantidadeTotal: number = 0;
	carregando: boolean = true;
	colunasVisiveis: string[] = [ "foto", "nome", "preco", "acoes" ];
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	private subscriptions: SubscriptionContainer = new SubscriptionContainer();
	produtoClicado: Produto | null = null;
	tamanhosPaginacao: number[] = [ 5, 10, 15, 20 ];

	constructor (
		private titleService: TitleService,
		private produtosState: ProdutosState,
		private produtoService: ProdutoService,
		private notificationService: NotificationService,
		public dialog: MatDialog
	) {
		this.titleService.setTitle("Produtos", "/produtos", "Cadastro de produtos");
	}

	ngOnInit(): void {
		this.subscriptions.add = this.produtosState.produtos$.subscribe({
			next: produtos => {
				this.produtos = produtos;
			}
		});
	}

	ngAfterViewInit(): void {
		// Retorna para a primeira página se mudar a ordenação
		this.subscriptions.add = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

		this.subscriptions.add = merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				startWith({}),
				switchMap(() => {
					return this.carregarDados();
				})
			).subscribe(data => {
				this.carregando = false;
				this.quantidadeTotal = data?.total;
			});
	}

	ngOnDestroy(): void {
		this.subscriptions.dispose();
		this.dialog.closeAll();
	}

	carregarDados() {
		this.carregando = true;
		return this.produtoService.pesquisar(
			this.paginator?.pageIndex + 1,
			this.paginator?.pageSize || this.tamanhosPaginacao[ 0 ],
			(this.sort?.direction === "asc" ? 1 : -1) || 1
		);
	}

	atualizarDados(exibirNotificacao: boolean = false) {
		this.carregarDados().subscribe(data => {
			if (exibirNotificacao)
				this.notificationService.exibir("Dados atualizados com sucesso!");
			this.carregando = false;
			this.quantidadeTotal = data?.total;
		});
	}

	filtrar(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.produtoService.pesquisar(
			this.paginator?.pageIndex || 0,
			this.paginator?.pageSize || 10,
			(this.sort?.direction == "asc" ? 1 : -1) || 1,
			filterValue.trim()
		).subscribe();
	}

	abrirDialogoDeEdicao(produto?: Produto) {

		const dialogRef = this.dialog.open(ProdutoEditDialogComponent, {
			disableClose: true,
			width: "640px",
			data: produto,
		});

		dialogRef.afterClosed()
			.pipe(take(1))
			.subscribe(result => {
				if (result)
					this.produtoService.atualizaState(result);
			});
	}

	toggleRowExpanded(produtoClicado: Produto) {
		this.produtoClicado = this.produtoClicado === produtoClicado ? null : produtoClicado;
	}

	limparInput(input: any) {
		var event = new Event('keyup');
		input.value = '';
		input.dispatchEvent(event);
	}
}
