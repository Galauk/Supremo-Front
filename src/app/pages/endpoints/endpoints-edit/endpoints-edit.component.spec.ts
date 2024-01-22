import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointsEditComponent } from './endpoints-edit.component';

describe('EndpointsEditComponent', () => {
  let component: EndpointsEditComponent;
  let fixture: ComponentFixture<EndpointsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
