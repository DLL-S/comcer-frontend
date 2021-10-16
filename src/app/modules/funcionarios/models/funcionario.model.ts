import { EnumSituacaoUsuario } from "src/app/core/enums/situacao.enum";
import { Endereco } from "src/app/shared/models/endereco.model";

/**
 * Interface padrão do Model Funcionario.
 */
export interface Funcionario {
	id: number;
	nome: string;
	cpf: string;
	dataNascimento: Date;
	email: string;
	celular: string;
	endereco: Endereco;
	situacao: EnumSituacaoUsuario;
}
