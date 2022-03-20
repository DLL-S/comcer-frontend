import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from "rxjs";
import { GenericApi } from 'src/app/core/services/generic-api.service';
import { FuncionariosState } from "../state/funcionarios-state";
import { ResponseModel } from './../../../core/models/response.model';
import { Funcionario } from './../models/funcionario.model';

@Injectable()
export class FuncionarioService extends GenericApi<Funcionario> {

    /**
     * Inicia uma nova instância de {@link FuncionarioService}
     * @param http O {@link HttpClient} do serviço.
     */
    constructor (http: HttpClient, private state: FuncionariosState) {
        super(http, "/funcionarios");
    }

    /**
     * Obtém uma lista de {@link Funcionario} da API.
     */
    public listaDeFuncionarios$ = this.http
        .get<ResponseModel<Funcionario>>(this.apiBaseUrl, this.obtenhaHeaderAuth())
        .pipe(
            tap(next => {
                this.state.set(next.resultados, "funcionarios");
            })
        );
}
