import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InativaFuncionarioComponent } from './inativa-funcionario.component';

describe('InativaFuncionarioComponent', () => {
  let component: InativaFuncionarioComponent;
  let fixture: ComponentFixture<InativaFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InativaFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InativaFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
