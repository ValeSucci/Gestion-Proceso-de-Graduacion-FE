import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaAltaAlumnoComponent } from './nueva-alta-alumno.component';

describe('NuevaAltaAlumnoComponent', () => {
  let component: NuevaAltaAlumnoComponent;
  let fixture: ComponentFixture<NuevaAltaAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaAltaAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaAltaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
