import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAlumnoComponent } from './actualizar-alumno.component';

describe('ActualizarAlumnoComponent', () => {
  let component: ActualizarAlumnoComponent;
  let fixture: ComponentFixture<ActualizarAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
