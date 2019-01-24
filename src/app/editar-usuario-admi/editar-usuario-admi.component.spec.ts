import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuarioAdmiComponent } from './editar-usuario-admi.component';

describe('EditarUsuarioAdmiComponent', () => {
  let component: EditarUsuarioAdmiComponent;
  let fixture: ComponentFixture<EditarUsuarioAdmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarUsuarioAdmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUsuarioAdmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
