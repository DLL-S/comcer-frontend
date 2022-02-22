import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from "src/app/core/core.module";
import { ComandasRoutingModule } from "./comandas-routing.module";
import { ComandasListComponent } from './containers/comandas-list/comandas-list.component';
import { ComandaApi } from "./services/comanda-api";


@NgModule({
	declarations: [
		ComandasListComponent
	],
	imports: [
		CommonModule,
		ComandasRoutingModule,
		CoreModule
	],
	providers: [
		ComandaApi
	]
})
export class ComandasModule { }
