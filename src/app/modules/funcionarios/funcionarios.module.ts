import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "src/app/core/core.module";
import { FuncionariosListComponent } from "./containers/funcionarios-list/funcionarios-list.component";
import { FuncionariosRoutingModule } from "./funcionarios-routing.module";
import { FuncionariosApi } from "./services/funcionarios-api";
import { FuncionariosFacade } from "./services/funcionarios-facade";
import { FuncionariosState } from "./services/funcionarios.state";
import { EditaFuncionarioComponent } from './components/edita-funcionario/edita-funcionario.component';
import { InativaFuncionarioComponent } from './components/inativa-funcionario/inativa-funcionario.component';


@NgModule({
	declarations: [
		FuncionariosListComponent,
  EditaFuncionarioComponent,
  InativaFuncionarioComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FuncionariosRoutingModule,
		CoreModule
	],
	providers: [
		FuncionariosApi,
		FuncionariosState,
		FuncionariosFacade
	]
})
export class FuncionariosModule { }
