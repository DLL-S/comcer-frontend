import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEmConstrucaoComponent } from './pagina-em-construcao.component';

describe('PaginaEmConstrucaoComponent', () => {
  let component: PaginaEmConstrucaoComponent;
  let fixture: ComponentFixture<PaginaEmConstrucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaEmConstrucaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaEmConstrucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
