/**
 * Interface padrão para o Model {@link Endereco}.
 */
export interface Endereco {
	cep: string;
	cidade: string;
	estado: string;
	bairro: string;
	rua: string;
	numero: string;
	complemento?: string;
}
