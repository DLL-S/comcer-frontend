import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { Paginacao } from "src/app/core/models/paginacao.model";
import { ColunasParaTabela } from "src/app/core/models/tabela-headers.model";
import { TitleService } from "src/app/core/services/title.service";
import { Funcionario } from "../../models/funcionario.model";
import { FuncionariosFacade } from "../../services/funcionarios-facade";

@Component({
	selector: "app-funcionarios-list",
	templateUrl: "./funcionarios-list.component.html",
	styleUrls: [ "./funcionarios-list.component.css" ]
})
export class FuncionariosListComponent implements OnInit {

	adicionaFuncionarioForm: FormGroup;
	funcionarios$: Observable<Funcionario[]>;
	tabelaEstaCarregando$: Observable<boolean>;
	colunasTabela: ColunasParaTabela;
	camposDoFiltro: string[];

	constructor (private titleService: TitleService, private funcionariosFacade: FuncionariosFacade) {
		this.titleService.setTitle("Funcionários", "/funcionarios");
		this.camposDoFiltro = [ "nome", "email" ];
		this.funcionarios$ = of(Array<Funcionario>());
		this.tabelaEstaCarregando$ = of(false);
		this.colunasTabela = {
			colunas: [
				{ campo: "nome", descricao: "Nome", ordenavel: true },
				{ campo: "email", descricao: "Login", ordenavel: true },
				{ campo: "situacao", descricao: "Status", ordenavel: true }
			],
			exibirAcoes: true
		};

		this.adicionaFuncionarioForm = new FormGroup({
			id: new FormControl(),
			nome: new FormControl(),
			cpf: new FormControl(),
			dataNascimento: new FormControl(),
			email: new FormControl(),
			celular: new FormControl(),
			situacao: new FormControl()
		});
	}

	ngOnInit(): void {
		this.funcionarios$ = this.funcionariosFacade.objetos$;
		this.funcionarios$.subscribe(() => this.tabelaEstaCarregando$ = of(false));
	}

	recarregar(): void {
		this.tabelaEstaCarregando$ = of(true);
		this.funcionariosFacade.carregarObjetos();
	}

	carregarPagina(event$: Paginacao): void {
		console.log(event$);
		console.log("Ordenando...");
	}

	pesquisar(termoDeBusca$: Observable<string>): void {
		this.tabelaEstaCarregando$ = of(true);
		this.funcionariosFacade.pesquisar(termoDeBusca$);
	}

	adicionaFuncionario(): void {
		let funcionario: Funcionario = this.adicionaFuncionarioForm.value as Funcionario;
		console.log(funcionario);
		this.funcionariosFacade.criar(funcionario);
	}

	exibirFormulario(event$: unknown): void {
		const dados: Funcionario = event$ as Funcionario;

		if (dados) {
			console.log(dados);
		}
		else {
			console.log("PQP " + dados);
		}
	}

	protected formularioDeEdicao(): void {

	}

	protected formularioDeInclusao(): void {

	}
}