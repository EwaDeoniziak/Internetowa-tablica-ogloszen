import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualiseConfirmComponent } from './actualise-confirm.component';

describe('ActualiseConfirmComponent', () => {
  let component: ActualiseConfirmComponent;
  let fixture: ComponentFixture<ActualiseConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualiseConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualiseConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
