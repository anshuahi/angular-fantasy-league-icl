import { Component, Input, OnInit } from '@angular/core';
import { WeekDetails } from '../homepage/homepage.component';
import { MatchInfoComponent } from "./match-info/match-info.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FantasyLeagueService } from '../../services/fantasy-league.service';
import { CommonModule } from '@angular/common';
import { LeaderboardDialogComponent } from '../../dialogs/leaderboard-dialog/leaderboard-dialog.component';

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

  createTeam = false;

  ngOnInit(): void {
    this.teamId = this.fantasyLeagueService.getTeamId(this.weekDay.weekId.toString());
    this.getTeam();
  }

  @Input() weekDay!: WeekDetails
  teamId!: string;


  goToCreateTeam() {
    this.router.navigate(['/create-new-team', Number(this.weekDay?.weekId)]);  // Navigate to the /create-team URL
  }

  previewTeam() {

  }

  getTeam() {
    this.teamId = this.fantasyLeagueService.getTeamId(this.weekDay.weekId.toString());
    // console.log("teamId", this.teamId)
  }

  openLeaderBoard() {
    this.router.navigate(['/leaderboard', Number(this.weekDay?.weekId)]);
    // const dialogRef = this.dialog.open(LeaderboardDialogComponent, {
    //   width: '350px',
    //   data: { weekId: this.weekDay?.weekId }  // Optional data passing
    // });
  }
}
