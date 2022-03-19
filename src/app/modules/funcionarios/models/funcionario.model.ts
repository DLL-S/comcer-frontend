import { BaseModel } from "src/app/shared/models/base.model";
import { Endereco } from "src/app/shared/models/endereco.model";
import { EnumSituacaoUsuario } from "src/app/shared/models/enums/situacao.enum";

/**
 * Interface padrão do Model Funcionario.
 */
export interface Funcionario extends BaseModel {
	nome: string;
	cpf: string;
	dataNascimento: Date;
	email: string;
	celular: string;
	endereco: Endereco;
	situacao: EnumSituacaoUsuario;
}
