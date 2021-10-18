import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FuncionariosListComponent } from "./containers/funcionarios-list/funcionarios-list.component";
import { FuncionariosFacade } from "./services/funcionarios-facade";
import { FuncionariosRoutingModule } from "./funcionarios-routing.module";
import { FuncionariosApi } from "./services/funcionarios-api";
import { FuncionariosState } from "./services/funcionarios.state";

@NgModule({
	declarations: [
		FuncionariosListComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FuncionariosRoutingModule
	],
	providers: [
		FuncionariosApi,
		FuncionariosState,
		FuncionariosFacade
	]
})
export class FuncionariosModule { }
