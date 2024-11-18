import { Component, OnInit, signal } from '@angular/core';
import { GlobalLeaderboardResponse, GlobalLeaderboardUser, LeaderboardFantasyTeam } from '../../models/leaderboard-response.mode';
import { FantasyLeagueService } from '../../services/fantasy-league.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { PreviewAllTeamsComponent } from '../../dialogs/preview-all-teams/preview-all-teams.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { PreviewTeamDialogComponent } from '../../dialogs/preview-team/preview-team-dialog.component';

@Component({
  selector: 'app-global-leaderboard',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatExpansionModule, MatIconModule],
  templateUrl: './global-leaderboard.component.html',
  styleUrl: './global-leaderboard.component.scss'
})
export class GlobalLeaderboardComponent implements OnInit {
  previewTeam(team: LeaderboardFantasyTeam) {
    // throw new Error('Method not implemented.');
    console.log(team);
    const dialogRef = this.dialog.open(PreviewTeamDialogComponent, {
      width: '350px',
      data: team // Optional data passing
    });
  }
  readonly panelOpenState = signal(false);
  globalLeaderboardResponse!: GlobalLeaderboardUser[];

  constructor(private fantasyLeagueService: FantasyLeagueService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.fantasyLeagueService.getGlobalLeaderboard().subscribe(
      resp => {
        this.globalLeaderboardResponse = resp.globalLeaderboardUsers.map(
          user => {
            return {
              totalPoints: Math.floor(Number(user.totalPoints) * 1000) / 1000,
              leaderboardUser: user.leaderboardUser,
              fantasyTeamList: user.fantasyTeamList
            }
          }
        );

        console.log(resp);
      }
    )
  }

}
