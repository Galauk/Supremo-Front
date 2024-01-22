import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointsNewComponent } from './endpoints-new.component';

describe('EndpointsNewComponent', () => {
  let component: EndpointsNewComponent;
  let fixture: ComponentFixture<EndpointsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndpointsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
