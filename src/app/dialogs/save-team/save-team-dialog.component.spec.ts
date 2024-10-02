import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTeamDialogComponent } from './save-team-dialog.component';

describe('SaveTeamDialogComponent', () => {
  let component: SaveTeamDialogComponent;
  let fixture: ComponentFixture<SaveTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveTeamDialogComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SaveTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
