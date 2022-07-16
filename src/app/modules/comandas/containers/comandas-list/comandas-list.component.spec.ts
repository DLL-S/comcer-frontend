import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandasListComponent } from './comandas-list.component';

describe('ComandasListComponent', () => {
  let component: ComandasListComponent;
  let fixture: ComponentFixture<ComandasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComandasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComandasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
