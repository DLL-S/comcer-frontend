import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { CoreModule } from './../../core/core.module';
import { SharedModule } from './../../shared/shared.module';
import { ComandasRoutingModule } from './comandas-routing.module';
import { ComandaViewComponent } from './components/comanda-view/comanda-view.component';
import { ComandasListComponent } from './containers/comandas-list/comandas-list.component';
import { ComandasService } from './services/comandas.service';
import { ComandasState } from './state/comandas-state';


@NgModule({
	declarations: [
		ComandasListComponent,
		ComandaViewComponent,
	],
	imports: [
		CommonModule,
		ComandasRoutingModule,
		SharedModule,
		CoreModule,
		FormsModule,
		ReactiveFormsModule,
		MatTableModule,
		MatIconModule,
		MatRippleModule,
		MatSortModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatExpansionModule,
		MatButtonModule,
		MatInputModule,
		MatListModule,
		MatFormFieldModule,
		MatTooltipModule,
		MatDialogModule,
		MatGridListModule,
		NgxMaskModule.forRoot(),
	],
	providers: [
		ComandasState,
		ComandasService
	]
})
export class ComandasModule { }
