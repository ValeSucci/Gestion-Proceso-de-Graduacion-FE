import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAlumnoComponent } from './ver-alumno.component';

describe('VerAlumnoComponent', () => {
  let component: VerAlumnoComponent;
  let fixture: ComponentFixture<VerAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
