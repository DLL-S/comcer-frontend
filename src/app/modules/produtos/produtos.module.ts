import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ProdutosListComponent } from './containers/produtos-list/produtos-list.component';
import { ProdutosRoutingModule } from "./produtos-routing.module";
import { ProdutosService } from "./services/produto.service";
import { ProdutosState } from "./state/produtos-state";

@NgModule({
	declarations: [
		ProdutosListComponent
	],
	imports: [
		CommonModule,
		ProdutosRoutingModule,
		MatTableModule,
		MatIconModule,
		MatRippleModule,
		MatSortModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatButtonModule,
		MatInputModule,
		MatFormFieldModule
	],
	providers: [
		ProdutosService,
		ProdutosState
	]
})
export class ProdutosModule { }
