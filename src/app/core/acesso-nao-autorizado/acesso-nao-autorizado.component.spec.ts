import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcessoNaoAutorizadoComponent } from './acesso-nao-autorizado.component';

describe('AcessoNaoAutorizadoComponent', () => {
  let component: AcessoNaoAutorizadoComponent;
  let fixture: ComponentFixture<AcessoNaoAutorizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcessoNaoAutorizadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcessoNaoAutorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
