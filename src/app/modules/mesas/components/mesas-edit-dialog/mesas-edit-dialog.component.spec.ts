import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasEditDialogComponent } from './mesas-edit-dialog.component';

describe('MesasEditDialogComponent', () => {
  let component: MesasEditDialogComponent;
  let fixture: ComponentFixture<MesasEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesasEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesasEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
