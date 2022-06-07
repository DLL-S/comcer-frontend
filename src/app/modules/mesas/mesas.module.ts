import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from './../../core/core.module';
import { MesasEditDialogComponent } from './components/mesas-edit-dialog/mesas-edit-dialog.component';
import { MesasListComponent } from './containers/mesas-list/mesas-list.component';
import { MesasRoutingModule } from './mesas-routing.module';
import { MesaService } from './services/mesa.service';
import { MesaState } from './state/mesa.state';



@NgModule({
	declarations: [
		MesasListComponent,
		MesasEditDialogComponent
	],
	imports: [
		CommonModule,
		MesasRoutingModule,
		CoreModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		MatChipsModule,
		FlexLayoutModule,
		MatRippleModule,
		MatIconModule,
		MatTooltipModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatDialogModule
	],
	providers: [
		MesaService,
		MesaState
	]
})
export class MesasModule { }
