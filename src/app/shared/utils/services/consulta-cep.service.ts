import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ConsultaCep } from "../../models/via-cep.model";

@Injectable()
export class ConsultaCepService {

	constructor (private http: HttpClient) { }

	consultar(cep: string) {
		return this.http.get<ConsultaCep>(`https://viacep.com.br/ws/${ cep }/json/`);
	}
}
