import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateActivity } from './create-update-activity';

describe('CreateUpdateActivity', () => {
  let component: CreateUpdateActivity;
  let fixture: ComponentFixture<CreateUpdateActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateActivity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateActivity);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
