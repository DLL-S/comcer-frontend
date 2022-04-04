import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoEditDialogComponent } from './produto-edit-dialog.component';

describe('ProdutoEditDialogComponent', () => {
  let component: ProdutoEditDialogComponent;
  let fixture: ComponentFixture<ProdutoEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutoEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
