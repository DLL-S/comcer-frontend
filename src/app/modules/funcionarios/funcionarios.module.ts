import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FuncionariosListComponent } from './containers/funcionarios-list/funcionarios-list.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { FuncionarioService } from './services/funcionario.service';
import { FuncionariosState } from './state/funcionarios-state';


@NgModule({
    declarations: [
        FuncionariosListComponent
    ],
    imports: [
        FuncionariosRoutingModule,
        CommonModule,
        MatTableModule
    ],
    providers: [
        FuncionarioService,
        FuncionariosState
    ]
})
export class FuncionariosModule { }
