import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirPersonalComponent } from './inserir-personal.component';

describe('InserirPersonalComponent', () => {
  let component: InserirPersonalComponent;
  let fixture: ComponentFixture<InserirPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InserirPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
