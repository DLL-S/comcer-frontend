import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProdutosListComponent } from "./containers/produtos-list/produtos-list.component";

const produtosRoutes: Routes = [
	{ path: "", component: ProdutosListComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(produtosRoutes)
	],
	exports: []
})
export class ProdutosRoutingModule { }
