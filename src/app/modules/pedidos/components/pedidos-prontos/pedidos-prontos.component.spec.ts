import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosProntosComponent } from './pedidos-prontos.component';


describe('PedidosProntosComponent', () => {
	let component: PedidosProntosComponent;
	let fixture: ComponentFixture<PedidosProntosComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ PedidosProntosComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(PedidosProntosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
