import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FuncionariosListComponent } from "./containers/funcionarios-list/funcionarios-list.component";

const funcionariosRoutes: Routes = [
	{ path: "", component: FuncionariosListComponent  }
];

@NgModule({
	imports: [
		RouterModule.forChild(funcionariosRoutes)
	],
	exports: []
})
export class FuncionariosRoutingModule { }
