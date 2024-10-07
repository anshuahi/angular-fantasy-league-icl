import { Component, Input, OnInit } from '@angular/core';
import { WeekDetails } from '../homepage/homepage.component';
import { MatchInfoComponent } from "./match-info/match-info.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FantasyLeagueService } from '../../services/fantasy-league.service';
import { CommonModule } from '@angular/common';
import { LeaderboardFantasyTeam, MatchStatus } from '../../models/leaderboard-response.mode';
import { BehaviorSubject } from 'rxjs';
import { PreviewTeamDialogComponent } from '../../dialogs/preview-team/preview-team-dialog.component';

@Component({
  selector: 'app-match-day',
  standalone: true,
  imports: [MatchInfoComponent, MatButtonModule, MatCardModule, CommonModule],
  templateUrl: './match-day.component.html',
  styleUrl: './match-day.component.scss'
})
export class MatchDayComponent implements OnInit {

  constructor(private router: Router,
    private fantasyLeagueService: FantasyLeagueService,
    public dialog: MatDialog,
  ) { }

  previewTeamSubject = new BehaviorSubject<boolean>(false);
  previewTeam$ = this.previewTeamSubject.asObservable();
  previewTeam!: LeaderboardFantasyTeam;
  showLeaderBoard = false;
  showCreateEdit = false;
  showComingUp = false;
  showTeamPreview = false;
  showMatchDayDetails = false;

  createTeam = false;
  readonly MatchStatus = MatchStatus;

  ngOnInit(): void {
    this.showLeaderBoard = this.weekDay.status == MatchStatus.COMPLETED;
    this.showCreateEdit = this.weekDay.status == MatchStatus.IN_PROGRESS;
    this.showComingUp = this.weekDay.status == MatchStatus.COMING_UP;
    if (this.weekDay.status !== MatchStatus.COMING_UP.toString()) {
      this.fantasyLeagueService.getTeamByWeekId(this.weekDay.weekId.toString()).subscribe(
        (team: LeaderboardFantasyTeam) => {
          if (team.weekStatus) {
            this.previewTeam = team;
          }
        }
      )
    }
  }

  @Input() weekDay!: WeekDetails
  teamId!: string;


  goToCreateTeam() {
    this.router.navigate(['/create-new-team', Number(this.weekDay?.weekId)]);  // Navigate to the /create-team URL
  }

  previewYourTeam() {
    const dialogRef = this.dialog.open(PreviewTeamDialogComponent, {
      width: '350px',
      data: this.previewTeam // Optional data passing
    });
  }

  getTeam() {
    this.teamId = this.fantasyLeagueService.getTeamId(this.weekDay.weekId.toString());
  }

  openLeaderBoard() {
    this.router.navigate(['/leaderboard', Number(this.weekDay?.weekId)]);
  }
}
