import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FantasyLeagueService } from '../../services/fantasy-league.service';

@Component({
  selector: 'app-leaderboard-dialog',
  standalone: true,
  imports: [],
  templateUrl: './leaderboard-dialog.component.html',
  styleUrl: './leaderboard-dialog.component.scss'
})
export class LeaderboardDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LeaderboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { weekId: string },
    private fantasyLeagueService: FantasyLeagueService,
  ) { }
}
