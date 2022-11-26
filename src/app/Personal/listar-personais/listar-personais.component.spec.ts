import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPersonaisComponent } from './listar-personais.component';

describe('ListarPersonaisComponent', () => {
  let component: ListarPersonaisComponent;
  let fixture: ComponentFixture<ListarPersonaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPersonaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPersonaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
