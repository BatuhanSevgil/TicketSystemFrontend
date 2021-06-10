import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToworksComponent } from './toworks.component';

describe('ToworksComponent', () => {
  let component: ToworksComponent;
  let fixture: ComponentFixture<ToworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToworksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
