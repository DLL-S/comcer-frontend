import { BaseModel } from "src/app/shared/models/base.model";

/**
 * Interface padrão para o Model {@link Produto}.
 */
export interface Produto extends BaseModel {
	nome: string;
	descricao: string;
	preco: number;
	foto: string;
}
