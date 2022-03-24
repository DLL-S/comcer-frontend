import { Usuario } from "src/app/core/models/usuario.model";
import { Funcionario } from "./funcionario.model";

/**
 * Interface padrão para cadastro de Funcionario.
 */
export interface NovoFuncionario {
	funcionario: Funcionario;
	login?: Usuario;
}
