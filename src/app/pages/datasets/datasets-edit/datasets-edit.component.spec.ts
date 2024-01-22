import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetsEditComponent } from './datasets-edit.component';

describe('DatasetsEditComponent', () => {
  let component: DatasetsEditComponent;
  let fixture: ComponentFixture<DatasetsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
