import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesasListComponent } from './mesas-list.component';

describe('MesasListComponent', () => {
  let component: MesasListComponent;
  let fixture: ComponentFixture<MesasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MesasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
