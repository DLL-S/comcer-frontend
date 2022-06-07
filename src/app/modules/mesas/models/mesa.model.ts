import { BaseModel } from "src/app/shared/models/base.model";

/**
 * Interface padrão para o model de Mesa
 */
export interface Mesa extends BaseModel {
	numero: number;
	disponivel: boolean;
}
