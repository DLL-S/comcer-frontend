import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, startWith, switchMap, take } from 'rxjs';
import { SubscriptionContainer } from 'src/app/core/helpers/subscription-container';
import { NotificationService } from 'src/app/core/services/notification.service';
import { TitleService } from 'src/app/core/services/title.service';
import { Comanda } from '../../models/comanda.model';
import { ComandasService } from '../../services/comandas.service';
import { EnumStatusComanda } from './../../../../shared/models/enums/status-comanda.enum';
import { ComandaConfirmDialogComponent } from './../../components/comanda-confirm-dialog/comanda-confirm-dialog.component';
import { ComandaViewComponent } from './../../components/comanda-view/comanda-view.component';
import { ComandasState } from './../../state/comandas-state';

@Component({
	selector: 'app-comandas-list',
	templateUrl: './comandas-list.component.html',
	styleUrls: [ './comandas-list.component.css' ],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class ComandasListComponent implements OnInit, OnDestroy, AfterViewInit {

	comandas: Comanda[] = [];
	quantidadeTotal: number = 0;
	carregando: boolean = true;
	colunasVisiveis: string[] = [ "id", "nome", "valor", "status", "acoes" ];
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	private subscriptions: SubscriptionContainer = new SubscriptionContainer();
	comandaClicada: Comanda | null = null;
	tamanhosPaginacao: number[] = [ 5, 10, 15, 20 ];
	termoDeBusca: string = "";
	termoBuscado: "nome" | "id" | "valor" = "nome";

	constructor (
		private titleService: TitleService,
		private comnandasState: ComandasState,
		private comandasService: ComandasService,
		private notificationService: NotificationService,
		public dialog: MatDialog
	) {
		this.titleService.setTitle("Comandas", "/comandas", "Comandas Abertas");
	}

	ngOnInit(): void {
		this.subscriptions.add = this.comnandasState.comandas$
			.subscribe({
				next: comandas => {
					this.comandas = comandas;
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
		return this.comandasService.pesquisar(
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

	getStatusComanda(status: EnumStatusComanda) {
		return status != 1 ? EnumStatusComanda[ status ] : "Aguardando pagamento";
	}

	encerrarComanda(comanda: Comanda) {
		this.comandasService.encerrarComanda(comanda.id);
	}

	pesquisarV2(e: Event) {
		let termoDeBusca = (e.target as HTMLInputElement).value;
		this.comandasService.pesquisarV2(this.termoBuscado, termoDeBusca).subscribe();
	}

	abrirDialogoDeVisualizacao(comanda?: Comanda) {
		const dialogRef = this.dialog.open(ComandaViewComponent, {
			width: "640px",
			data: comanda,
		});

		dialogRef.afterClosed()
			.pipe(take(1))
			.subscribe(result => { });
	}

	abrirDialogoDeEncerramento(comanda: Comanda) {
		const dialogRef = this.dialog.open(ComandaConfirmDialogComponent, {
			width: "400px",
			data: comanda,
		});

		dialogRef.afterClosed()
			.pipe(take(1))
			.subscribe(result => {
				if (result && result.confirmacao)
					this.encerrarComanda(comanda);
			});
	}

	limparInput(input: any) {
		var event = new Event('keyup');
		input.value = '';
		input.dispatchEvent(event);
	}
}
