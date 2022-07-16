import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandaViewComponent } from './comanda-view.component';

describe('ComandaViewComponent', () => {
  let component: ComandaViewComponent;
  let fixture: ComponentFixture<ComandaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComandaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComandaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
