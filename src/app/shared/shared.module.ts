import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { PaginaEmConstrucaoComponent } from "./pages/pagina-em-construcao/pagina-em-construcao.component";
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';

@NgModule({
    declarations: [
        PaginaEmConstrucaoComponent,
        PaginaNaoEncontradaComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule
    ],
    exports: [
        PaginaEmConstrucaoComponent,
        PaginaNaoEncontradaComponent
    ]
})
export class SharedModule { }
