import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioInactiveDialogComponent } from './funcionario-inactive-dialog.component';

describe('FuncionarioInactiveDialogComponent', () => {
  let component: FuncionarioInactiveDialogComponent;
  let fixture: ComponentFixture<FuncionarioInactiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionarioInactiveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionarioInactiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
