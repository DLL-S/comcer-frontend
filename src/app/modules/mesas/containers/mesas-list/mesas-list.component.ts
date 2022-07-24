import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { take } from "rxjs";
import { SubscriptionContainer } from "src/app/core/helpers/subscription-container";
import { NotificationService } from 'src/app/core/services/notification.service';
import { TitleService } from "src/app/core/services/title.service";
import { MesasEditDialogComponent } from "../../components/mesas-edit-dialog/mesas-edit-dialog.component";
import { Mesa } from "../../models/mesa.model";
import { MesaService } from '../../services/mesa.service';
import { MesaState } from "../../state/mesa.state";

@Component({
	selector: 'app-mesas-list',
	templateUrl: './mesas-list.component.html',
	styleUrls: [ './mesas-list.component.css' ]
})
export class MesasListComponent implements OnInit, OnDestroy {

	mesas: Mesa[] = [];
	carregando: boolean = true;

	private subscriptions = new SubscriptionContainer();


	constructor (
		private titleService: TitleService,
		private mesasService: MesaService,
		private mesasState: MesaState,
		private notificationService: NotificationService,
		public dialog: MatDialog
	) {
		this.titleService.setTitle("Mesas", "/mesas", "Cadastro de mesas");
	}

	ngOnInit(): void {
		this.subscriptions.add = this.mesasState.mesas$.subscribe({
			next: result => {
				this.mesas = result;
			}
		});

		this.atualizarDados();
	}

	ngOnDestroy(): void {
		this.subscriptions.dispose();
	}

	atualizarDados(exibirNotificacao: boolean = false) {
		this.carregando = true;
		this.subscriptions.add = this.mesasService.listaDeMesas$
			.pipe(take(1))
			.subscribe(() => {
				if (exibirNotificacao)
					this.notificationService.exibir("Dados atualizados com sucesso!");
				this.carregando = false;
			});
	}

	abrirDialogoDeEdicao(mesa?: Mesa) {

		const dialogRef = this.dialog.open(MesasEditDialogComponent, {
			width: "480px",
			height: "230px",
			data: mesa,
		});

		dialogRef.afterClosed()
			.pipe(take(1))
			.subscribe();
	}
}
