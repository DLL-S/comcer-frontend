import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { TitleService } from 'src/app/core/services/title.service';
import { EnumSituacaoUsuario } from "src/app/shared/models/enums/situacao.enum";
import { FuncionarioEditDialogComponent } from "../../components/funcionario-edit-dialog/funcionario-edit-dialog.component";
import { FuncionarioInactiveDialogComponent } from "../../components/funcionario-inactive-dialog/funcionario-inactive-dialog.component";
import { Funcionario } from "../../models/funcionario.model";
import { FuncionarioService } from './../../services/funcionario.service';
import { FuncionariosState } from './../../state/funcionarios-state';

@Component({
	selector: 'app-funcionarios-list',
	templateUrl: './funcionarios-list.component.html',
	styleUrls: [ './funcionarios-list.component.css' ],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0' })),
			state('expanded', style({ height: '*' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class FuncionariosListComponent implements OnInit, AfterViewInit {

	TipoEnumSituacao = EnumSituacaoUsuario;
	dataSource: MatTableDataSource<Funcionario>;
	colunasVisiveis: string[] = [ "id", "nome", "email", "situacao", "acoes" ];
	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor (
		private titleService: TitleService,
		private funcionariosState: FuncionariosState,
		private funcionariosService: FuncionarioService,
		public dialog: MatDialog
	) {
		this.titleService.setTitle("Funcionários", "/funcionarios", "Cadastro de funcionários");

		this.funcionariosService.listaDeFuncionarios$.subscribe();
		this.dataSource = new MatTableDataSource();
	}

	ngOnInit(): void {
		this.funcionariosState.funcionarios$.subscribe({
			next: funcionarios => {
				this.dataSource.data = funcionarios;
			}
		});
	}

	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	abrirDialogoDeEdicao(funcionario?: Funcionario) {
		const dialogRef = this.dialog.open(FuncionarioEditDialogComponent, {
			width: "600px",
			data: funcionario
		});

		dialogRef.afterClosed().subscribe(result => {

		});
	}

	abrirDialogoDeInativacao(funcionario: Funcionario) {
		const dialogRef = this.dialog.open(FuncionarioInactiveDialogComponent, {
			width: "360px",
			data: funcionario
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result && result.confirmacao)
				this.inativarFuncionario(funcionario);
		});
	}

	editarFuncionario(funcionario: Funcionario) {
		console.log(funcionario);
	}

	inativarFuncionario(funcionario: Funcionario) {
		this.funcionariosService.alternarSituacao(funcionario);
	}
}
