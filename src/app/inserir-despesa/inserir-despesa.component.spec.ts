import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirDespesaComponent } from './inserir-despesa.component';

describe('InserirDespesaComponent', () => {
  let component: InserirDespesaComponent;
  let fixture: ComponentFixture<InserirDespesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirDespesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirDespesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
