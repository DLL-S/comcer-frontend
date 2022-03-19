import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosItemComponent } from './pedidos-item.component';

describe('PedidosItemComponent', () => {
  let component: PedidosItemComponent;
  let fixture: ComponentFixture<PedidosItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PedidosItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
