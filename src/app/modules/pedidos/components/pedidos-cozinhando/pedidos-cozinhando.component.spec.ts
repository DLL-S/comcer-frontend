import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosCozinhandoComponent } from './pedidos-cozinhando.component';


describe('PedidosCozinhandoComponent', () => {
	let component: PedidosCozinhandoComponent;
	let fixture: ComponentFixture<PedidosCozinhandoComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ PedidosCozinhandoComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PedidosCozinhandoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
