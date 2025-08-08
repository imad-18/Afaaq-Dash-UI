import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCampaign } from './update-campaign';

describe('UpdateCampaign', () => {
  let component: UpdateCampaign;
  let fixture: ComponentFixture<UpdateCampaign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCampaign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCampaign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
