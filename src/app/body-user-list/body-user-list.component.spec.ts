import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyUserListComponent } from './body-user-list.component';

describe('BodyUserListComponent', () => {
  let component: BodyUserListComponent;
  let fixture: ComponentFixture<BodyUserListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodyUserListComponent]
    });
    fixture = TestBed.createComponent(BodyUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
