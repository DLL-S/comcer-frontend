import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{ path: "funcionarios", loadChildren: () => import("./modules/funcionarios/funcionarios.module").then(m => m.FuncionariosModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: false })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
