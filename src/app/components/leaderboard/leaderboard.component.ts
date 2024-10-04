import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LeaderboardFantasyTeam, LeaderboardResponse } from '../../models/leaderboard-response.mode';
import { ActivatedRoute, Router } from '@angular/router';
import { FantasyLeagueService } from '../../services/fantasy-league.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { PreviewTeamDialogComponent } from '../../dialogs/preview-team/preview-team-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit {
  previewTeam(team: LeaderboardFantasyTeam) {
    const dialogRef = this.dialog.open(PreviewTeamDialogComponent, {
      width: '250px',
      data: team // Optional data passing
    });
  }


  leaderboardSubject = new BehaviorSubject<LeaderboardFantasyTeam[]>([]);
  leaderboard$ = this.leaderboardSubject.asObservable();
  leaderboard: LeaderboardFantasyTeam[] = [];
  showLeaderboard = false;
  weekId!: string;


  constructor(private router: Router,
    private fantasyLeagueService: FantasyLeagueService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.weekId = params.get('id')!;
      this.fantasyLeagueService.getLeaderboardDetails(this.weekId).subscribe(
        (response: LeaderboardResponse) => {
          if (response.status == 200) {
            this.leaderboardSubject.next(response.data);
            this.leaderboard = response.data.sort((a, b) => (Number(b.totalPoints) - Number(a.totalPoints)));
            this.showLeaderboard = true;
            // console.log(this.leaderboard);
          }
        }
      )
    })
  }

}
