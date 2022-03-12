import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginaEmConstrucaoComponent } from "./pages/pagina-em-construcao/pagina-em-construcao.component";



@NgModule({
    declarations: [
        PaginaEmConstrucaoComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        PaginaEmConstrucaoComponent
    ]
})
export class SharedModule { }
