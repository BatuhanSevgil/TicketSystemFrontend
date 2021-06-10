import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddticketmodalComponent } from './addticketmodal.component';

describe('AddticketmodalComponent', () => {
  let component: AddticketmodalComponent;
  let fixture: ComponentFixture<AddticketmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddticketmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddticketmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
