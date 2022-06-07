import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MesasListComponent } from './containers/mesas-list/mesas-list.component';

const mesasRoutes: Routes = [
	{ path: "", component: MesasListComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(mesasRoutes)
	],
	exports: []
})
export class MesasRoutingModule { }
