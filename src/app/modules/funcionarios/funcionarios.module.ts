import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "src/app/core/core.module";
import { EditaFuncionarioComponent } from './components/edita-funcionario/edita-funcionario.component';
import { InativaFuncionarioComponent } from './components/inativa-funcionario/inativa-funcionario.component';
import { FuncionariosListComponent } from "./containers/funcionarios-list/funcionarios-list.component";
import { FuncionariosRoutingModule } from "./funcionarios-routing.module";
import { FuncionariosApi } from "./services/funcionarios-api";


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
	]
})
export class FuncionariosModule { }
