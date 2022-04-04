import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { take } from "rxjs";
import { SubscriptionContainer } from "src/app/core/helpers/subscription-container";
import { NotificationService } from "src/app/core/services/notification.service";
import { TitleService } from 'src/app/core/services/title.service';
import { EnumSituacaoUsuario } from "src/app/shared/models/enums/situacao.enum";
import { FuncionarioEditDialogComponent } from "../../components/funcionario-edit-dialog/funcionario-edit-dialog.component";
import { FuncionarioInactiveDialogComponent } from "../../components/funcionario-inactive-dialog/funcionario-inactive-dialog.component";
import { Funcionario } from "../../models/funcionario.model";
import { FuncionarioService } from '../../services/funcionario.service';
import { FuncionariosState } from '../../state/funcionarios-state';

@Component({
	selector: 'app-funcionarios-list',
	templateUrl: './funcionarios-list.component.html',
	styleUrls: [ './funcionarios-list.component.css' ]
})
export class FuncionariosListComponent implements OnInit, AfterViewInit, OnDestroy {

	TipoEnumSituacao = EnumSituacaoUsuario;
	dataSource: MatTableDataSource<Funcionario>;
	colunasVisiveis: string[] = [ "id", "nome", "email", "situacao", "acoes" ];
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	private subscriptions = new SubscriptionContainer();

	constructor (
		private titleService: TitleService,
		private funcionariosState: FuncionariosState,
		private funcionariosService: FuncionarioService,
		private notificationService: NotificationService,
		public dialog: MatDialog
	) {
		this.titleService.setTitle("Funcionários", "/funcionarios", "Cadastro de funcionários");
		this.dataSource = new MatTableDataSource();
	}

	ngOnInit(): void {
		this.atualizarDados();
		this.subscriptions.add = this.funcionariosState.funcionarios$.subscribe({
			next: funcionarios => {
				this.dataSource.data = funcionarios;
			}
		});
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	ngOnDestroy(): void {
		this.subscriptions.dispose();
	}

	filtrar(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

	atualizarDados(exibirNotificacao: boolean = false) {
		this.funcionariosService.listaDeFuncionarios$
			.pipe(take(1))
			.subscribe(() => {
				if (exibirNotificacao)
					this.notificationService.exibir("Dados atualizados com sucesso!");
			});
	}

	abrirDialogoDeEdicao(funcionario?: Funcionario) {

		const dialogRef = this.dialog.open(FuncionarioEditDialogComponent, {
			disableClose: true,
			width: "640px",
			data: funcionario,
		});

		dialogRef.afterClosed()
			.pipe(take(1))
			.subscribe();
	}

	abrirDialogoDeInativacao(funcionario: Funcionario) {
		const dialogRef = this.dialog.open(FuncionarioInactiveDialogComponent, {
			width: "400px",
			data: funcionario,
		});

		dialogRef.afterClosed()
			.pipe(take(1))
			.subscribe(result => {
				if (result && result.confirmacao)
					this.inativarFuncionario(funcionario);
			});
	}

	inativarFuncionario(funcionario: Funcionario) {
		this.funcionariosService.alternarSituacao(funcionario);
	}

	limparInput(input: any) {
		input.value = '';
		this.dataSource.filter = '';
	}
}
