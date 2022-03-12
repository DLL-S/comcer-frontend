import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./core/components/login/login.component";
import { PaginaEmConstrucaoComponent } from "./shared/pages/pagina-em-construcao/pagina-em-construcao.component";

const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "pagina-em-construcao", component: PaginaEmConstrucaoComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
