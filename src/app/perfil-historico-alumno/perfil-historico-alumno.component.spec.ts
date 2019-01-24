import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilHistoricoAlumnoComponent } from './perfil-historico-alumno.component';

describe('PerfilHistoricoAlumnoComponent', () => {
  let component: PerfilHistoricoAlumnoComponent;
  let fixture: ComponentFixture<PerfilHistoricoAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilHistoricoAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilHistoricoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
