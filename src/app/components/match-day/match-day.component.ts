import { Component, Input } from '@angular/core';
import { WeekDetails } from '../homepage/homepage.component';
import { MatchInfoComponent } from "./match-info/match-info.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CreateTeamDialogComponent } from '../../dialogs/create-team-dialog/create-team-dialog.component';

@Component({
  selector: 'app-match-day',
  standalone: true,
  imports: [MatchInfoComponent, MatButtonModule, MatCardModule, CreateTeamDialogComponent],
  templateUrl: './match-day.component.html',
  styleUrl: './match-day.component.scss'
})
export class MatchDayComponent {
  constructor(public dialog: MatDialog) { }
  @Input() weekDay!: WeekDetails

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTeamDialogComponent, {
      width: '250px',
      data: { message: 'Hello from the dialog!' }  // Optional data passing
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
    });
  }
}
