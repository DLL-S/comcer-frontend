import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function cpfValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const error = { cpf: { value: control.value } };

		if (control.value == null)
			return error;
		if ((control.value == '00000000000') || (control.value == '11111111111') || (control.value == '22222222222')
			|| (control.value == '33333333333') || (control.value == '44444444444') || (control.value == '55555555555')
			|| (control.value == '66666666666') || (control.value == '77777777777') || (control.value == '88888888888')
			|| (control.value == '99999999999'))
			return error;

		let numero: number = 0;
		let caracter: string = '';
		let numeros: string = '0123456789';
		let j: number = 10;
		let somatorio: number = 0;
		let resto: number = 0;
		let digito1: number = 0;
		let digito2: number = 0;
		let cpfAux: string = '';
		cpfAux = control.value.substring(0, 9);

		for (let i: number = 0; i < 9; i++) {
			caracter = cpfAux.charAt(i);
			if (numeros.search(caracter) == -1) {
				return error;
			}
			numero = Number(caracter);
			somatorio = somatorio + (numero * j);
			j--;
		}
		resto = somatorio % 11;
		digito1 = 11 - resto;
		if (digito1 > 9) {
			digito1 = 0;
		}
		j = 11;
		somatorio = 0;
		cpfAux = cpfAux + digito1;
		for (let i: number = 0; i < 10; i++) {
			caracter = cpfAux.charAt(i);
			numero = Number(caracter);
			somatorio = somatorio + (numero * j);
			j--;
		}
		resto = somatorio % 11;
		digito2 = 11 - resto;
		if (digito2 > 9) {
			digito2 = 0;
		}
		cpfAux = cpfAux + digito2;
		if (control.value != cpfAux) {
			return error;
		}
		else {
			return null;
		}
	};
};
