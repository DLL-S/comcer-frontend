import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxMaskModule } from "ngx-mask";
import { SharedModule } from "src/app/shared/shared.module";
import { ProdutoEditDialogComponent } from './components/produto-edit-dialog/produto-edit-dialog.component';
import { ProdutosListComponent } from './containers/produtos-list/produtos-list.component';
import { ProdutosRoutingModule } from "./produtos-routing.module";
import { ProdutoService } from "./services/produto.service";
import { ProdutosState } from "./state/produtos-state";

@NgModule({
	declarations: [
		ProdutosListComponent,
		ProdutoEditDialogComponent
	],
	imports: [
		CommonModule,
		ProdutosRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		MatTableModule,
		MatIconModule,
		MatRippleModule,
		MatSortModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule,
		MatTooltipModule,
		MatDialogModule,
		MatGridListModule,
		NgxMaskModule.forRoot(),
	],
	providers: [
		ProdutoService,
		ProdutosState
	]
})
export class ProdutosModule { }
