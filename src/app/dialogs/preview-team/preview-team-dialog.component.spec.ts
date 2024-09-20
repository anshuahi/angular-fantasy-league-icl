import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewTeamDialogComponent } from './preview-team-dialog.component';

describe('PreviewTeamDialogComponent', () => {
  let component: PreviewTeamDialogComponent;
  let fixture: ComponentFixture<PreviewTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewTeamDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PreviewTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
