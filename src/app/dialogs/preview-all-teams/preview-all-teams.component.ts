import { Component, Inject, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalLeaderboardUser, LeaderboardFantasyTeam } from '../../models/leaderboard-response.mode';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-preview-all-teams',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatExpansionModule],
  templateUrl: './preview-all-teams.component.html',
  styleUrl: './preview-all-teams.component.scss'
})
export class PreviewAllTeamsComponent implements OnInit {


  previewTeam(team: LeaderboardFantasyTeam) {

  }

  teamsize = 15;
  constructor(
    public dialogRef: MatDialogRef<PreviewAllTeamsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GlobalLeaderboardUser,
  ) { }


  ngOnInit(): void {
    console.log(this.data);
  }

}
