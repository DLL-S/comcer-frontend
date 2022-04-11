import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { ConsultaCepService } from "src/app/shared/utils/services/consulta-cep.service";
import { CoreModule } from './../../core/core.module';
import { FuncionarioEditDialogComponent } from './components/funcionario-edit-dialog/funcionario-edit-dialog.component';
import { FuncionarioInactiveDialogComponent } from './components/funcionario-inactive-dialog/funcionario-inactive-dialog.component';
import { FuncionariosListComponent } from './containers/funcionarios-list/funcionarios-list.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionarioService } from './services/funcionario.service';
import { FuncionariosState } from './state/funcionarios-state';

@NgModule({
	declarations: [
		FuncionariosListComponent,
		FuncionarioEditDialogComponent,
		FuncionarioInactiveDialogComponent,
	],
	imports: [
		FuncionariosRoutingModule,
		CommonModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule,
		MatTableModule,
		MatTooltipModule,
		MatButtonModule,
		MatIconModule,
		MatRippleModule,
		MatSortModule,
		MatPaginatorModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		NgxMaskModule.forRoot(),
		MatButtonToggleModule,
		MatGridListModule,
		MatDividerModule
	],
	providers: [
		FuncionarioService,
		FuncionariosState,
		ConsultaCepService
	]
})
export class FuncionariosModule { }
