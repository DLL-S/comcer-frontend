import { BaseModel } from "src/app/shared/models/base.model";

/**
 * Interface padrão para o Model {@link Endereco}.
 */
export interface Endereco extends BaseModel {
	cep: string;
	cidade: string;
	estado: string;
	bairro: string;
	rua: string;
	numero: string;
	complemento?: string;
}
