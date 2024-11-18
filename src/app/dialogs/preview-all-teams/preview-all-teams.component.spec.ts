import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAllTeamsComponent } from './preview-all-teams.component';

describe('PreviewAllTeamsComponent', () => {
  let component: PreviewAllTeamsComponent;
  let fixture: ComponentFixture<PreviewAllTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewAllTeamsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewAllTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
