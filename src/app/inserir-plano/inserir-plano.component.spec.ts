import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirPlanoComponent } from './inserir-plano.component';

describe('InserirPlanoComponent', () => {
  let component: InserirPlanoComponent;
  let fixture: ComponentFixture<InserirPlanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirPlanoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirPlanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
