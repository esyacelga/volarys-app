import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbautComponent } from './abaut.component';

describe('AbautComponent', () => {
  let component: AbautComponent;
  let fixture: ComponentFixture<AbautComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbautComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
