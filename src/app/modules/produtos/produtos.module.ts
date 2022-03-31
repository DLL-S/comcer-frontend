import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProdutosListComponent } from './containers/produtos-list/produtos-list.component';
import { ProdutosRoutingModule } from "./produtos-routing.module";



@NgModule({
	declarations: [
		ProdutosListComponent
	],
	imports: [
		CommonModule,
		ProdutosRoutingModule
	]
})
export class ProdutosModule { }
