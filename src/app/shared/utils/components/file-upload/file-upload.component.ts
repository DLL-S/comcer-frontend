import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, ReplaySubject, take } from 'rxjs';

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: [ './file-upload.component.css' ]
})
export class FileUploadComponent implements OnInit {

	@Input() grupoFormulario!: FormGroup;
	@Input() nomeControleFormulario!: string;
	mensagemDeErro: string | null = "";
	imagemBase64: string | null = "";

	constructor () { }

	ngOnInit(): void {
		this.imagemBase64 = this.grupoFormulario.get(this.nomeControleFormulario)?.value;
	}

	fileChangeEvent(fileInput: any) {

		this.mensagemDeErro = null;

		if (this.validarImagem(fileInput)) {

			this.handleBase64Image(fileInput.target.files[ 0 ])
				.pipe(take(1))
				.subscribe({
					next: base64 => {
						this.imagemBase64 = base64;
						this.grupoFormulario.get(this.nomeControleFormulario)?.setValue(this.imagemBase64);
					},
					error: () => {
						this.mensagemDeErro = "Ocorreu um erro ao carregar a imagem, tente novamente";
					}
				});
		}
	}

	removerImagem(input: any) {
		input.value = "";
		this.imagemBase64 = null;
		this.grupoFormulario.get(this.nomeControleFormulario)?.setValue(this.imagemBase64);
		this.mensagemDeErro = 'Selecione uma imagem, PNG ou JPEG';
	}

	private validarImagem(fileInput: any): boolean {

		if (fileInput.target.files && fileInput.target.files[ 0 ]) {
			const max_size = 20971520;
			const allowed_types = [ 'image/png', 'image/jpeg' ];

			if (fileInput.target.files[ 0 ].size > max_size) {
				this.mensagemDeErro =
					'A imagem deve possuir no máximo ' + max_size / 1000 + 'Mb';
				return false;
			}

			if (!allowed_types.includes(fileInput.target.files[ 0 ].type)) {
				this.mensagemDeErro = 'Selecione uma imagem, PNG ou JPEG';
				return false;
			}
		}
		else {
			this.mensagemDeErro = 'Selecione uma imagem, PNG ou JPEG';
			return false;
		}

		return true;
	}

	private handleBase64Image(file: File): Observable<string> {

		const result = new ReplaySubject<string>(1);
		const reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = (event) => {
			result.next(btoa(event.target?.result?.toString() || ""));
		};
		return result;
	}

}
