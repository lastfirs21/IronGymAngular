import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirPagamentoComponent } from './inserir-pagamento.component';

describe('InserirPagamentoComponent', () => {
  let component: InserirPagamentoComponent;
  let fixture: ComponentFixture<InserirPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
