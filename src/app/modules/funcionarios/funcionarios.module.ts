import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FuncionariosListComponent } from "./containers/funcionarios-list/funcionarios-list.component";
import { FuncionariosFacade } from "./funcionarios-facade";
import { FuncionariosRoutingModule } from "./funcionarios-routing.module";




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
		FuncionariosFacade
	]
})
export class FuncionariosModule { }
