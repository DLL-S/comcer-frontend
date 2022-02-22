import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComandasListComponent } from "./containers/comandas-list/comandas-list.component";

const comandasRoutes: Routes = [
	{ path: "", component: ComandasListComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(comandasRoutes)
	],
	exports: []
})
export class ComandasRoutingModule { }
