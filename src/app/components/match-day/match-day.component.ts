import { Component, Input, OnInit } from '@angular/core';
import { WeekDetails } from '../homepage/homepage.component';
import { MatchInfoComponent } from "./match-info/match-info.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { CreateTeamDialogComponent } from '../../dialogs/create-team-dialog/create-team-dialog.component';
import { Router } from '@angular/router';
import { FantasyLeagueService } from '../../services/fantasy-league.service';

@Component({
  selector: 'app-match-day',
  standalone: true,
  imports: [MatchInfoComponent, MatButtonModule, MatCardModule, CreateTeamDialogComponent],
  templateUrl: './match-day.component.html',
  styleUrl: './match-day.component.scss'
})
export class MatchDayComponent implements OnInit {
  constructor(private router: Router,
    private fantasyLeagueService: FantasyLeagueService
  ) { }

  createTeam = false;

  ngOnInit(): void {
    this.getTeam();
    this.canMakeTeam();
  }
  @Input() weekDay!: WeekDetails
  teamId!: string;

  canMakeTeam() {
    const timestamp = Date.now();
    // console.log(timestamp);
    if (timestamp > 1726889430000) {
      this.createTeam = true;
      return true;
    }
    // console.log(timestamp);
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    // console.log(Math.round(Number(this.weekDay.cutOffTime) * 1000 - timestamp), this.weekDay.cutOffTime, Math.round(timestamp), oneWeekInMilliseconds);
    this.createTeam = Math.round(Number(this.weekDay.cutOffTime) * 1000 - timestamp) > oneWeekInMilliseconds;
    return this.createTeam;
  }


  goToCreateTeam() {
    this.router.navigate(['/create-new-team', Number(this.weekDay?.weekId)]);  // Navigate to the /create-team URL
  }

  previewTeam() {

  }

  getTeam() {
    this.teamId = this.fantasyLeagueService.getTeamId(this.weekDay.weekId.toString());
    // console.log("teamId", this.teamId)
  }
}
