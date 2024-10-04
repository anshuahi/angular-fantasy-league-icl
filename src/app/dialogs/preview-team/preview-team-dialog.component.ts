import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FantasyLeagueService } from '../../services/fantasy-league.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { PlayerDetail } from '../../models/player-details.model';
import { FantasyTeamResponse } from '../../models/fantasy-team.model';
import { Router } from '@angular/router';
import { LeaderboardFantasyTeam } from '../../models/leaderboard-response.mode';

@Component({
  selector: 'app-preview-team',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatButtonModule],
  templateUrl: './preview-team-dialog.component.html',
  styleUrl: './preview-team-dialog.component.scss'
})
export class PreviewTeamDialogComponent implements OnInit {

  teamsize = 15;
  constructor(
    public dialogRef: MatDialogRef<PreviewTeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LeaderboardFantasyTeam,
    private router: Router,
  ) { }


  ngOnInit(): void {
  }

  goToCreateTeam() {
    this.dialogRef.close();
    this.router.navigate(['/create-new-team', Number(this.data.weekId)]);  // Navigate to the /create-team URL
  }
}
