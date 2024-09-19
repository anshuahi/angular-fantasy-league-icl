import { Component, Input } from '@angular/core';
import { WeekDetails } from '../homepage/homepage.component';
import { MatchInfoComponent } from "./match-info/match-info.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CreateTeamDialogComponent } from '../../dialogs/create-team-dialog/create-team-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match-day',
  standalone: true,
  imports: [MatchInfoComponent, MatButtonModule, MatCardModule, CreateTeamDialogComponent],
  templateUrl: './match-day.component.html',
  styleUrl: './match-day.component.scss'
})
export class MatchDayComponent {
  constructor(private router: Router) { }
  @Input() weekDay!: WeekDetails


  goToCreateTeam() {
    this.router.navigate(['/create-new-team']);  // Navigate to the /create-team URL
  }
}
