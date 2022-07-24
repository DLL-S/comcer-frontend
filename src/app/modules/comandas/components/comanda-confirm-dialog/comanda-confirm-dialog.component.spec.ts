import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandaConfirmDialogComponent } from './comanda-confirm-dialog.component';

describe('ComandaConfirmDialogComponent', () => {
  let component: ComandaConfirmDialogComponent;
  let fixture: ComponentFixture<ComandaConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComandaConfirmDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComandaConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
