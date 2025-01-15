import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FantasyLeagueService } from '../../services/fantasy-league.service';
import { BehaviorSubject, filter, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TeamPipe } from '../../pipes/team.pipe';
import { MatCardModule } from '@angular/material/card';
// import { PreviewTeamDialogComponent } from '../../dialogs/preview-team/preview-team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PlayerDetail } from '../../models/player-details.model';
import { ActivatedRoute } from '@angular/router';
import { SaveTeamDialogComponent } from '../../dialogs/save-team/save-team-dialog.component';
import { LeaderboardFantasyTeam, PlayerMatchPoints } from '../../models/leaderboard-response.mode';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-create-new-team',
  standalone: true,
  imports: [HttpClientModule, CommonModule, MatProgressSpinnerModule, TeamPipe, MatCardModule, FormsModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './create-new-team.component.html',
  styleUrl: './create-new-team.component.scss'
})
export class CreateNewTeamComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private fantasyLeagueService: FantasyLeagueService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  teamSize: number = 15;
  // playerDetailsSubject = new BehaviorSubject<PlayerDetail[]>([]);
  // playerDetails$: Observable<PlayerDetail[]> = this.fantasyLeagueService.getPlayerList();
  playerDetails!: PlayerDetail[];
  teams: string[] = ["NB", "LE", "IJ", "DW", "HU", "PR"];
  creditsLeft: number = 120;
  showTeams = false;

  teamId!: string;

  selectedPlayers: string[] = [];
  weekId!: string;

  ngOnInit(): void {
    this.selectedPlayers = [];

    this.route.paramMap.subscribe(params => {
      this.playerDetails = this.fantasyLeagueService.getPlayers();
      this.weekId = params.get('id')!;
      // this.teams =
      const teams = this.fantasyLeagueService.getTeamsByMatch(this.weekId)
      if (teams.length) {
        this.teams = teams;
        console.log(this.teams)
      }
      this.teams = this.teams.filter(team => team != '');
      this.teamId = this.fantasyLeagueService.getTeamId(this.weekId);
      this.fantasyLeagueService.getTeamByWeekId(this.weekId).subscribe(
        (team: LeaderboardFantasyTeam) => {
          this.showTeams = true;
          if (team.captainId) {
            // console.log('team', team);
            this.selectedPlayers = team.playerMatchPoints?.map(player => player.playerId);

            this.playerDetails.map(player => {
              if (this.selectedPlayers.includes(player.playerId.toString())) {
                this.creditsLeft = this.creditsLeft - Number(player.rating);
              }
            })
            setTimeout(() => {
              team.playerMatchPoints.map((player: PlayerMatchPoints) => {
                const checkbox = document.getElementById(player.playerId) as HTMLInputElement;
                if (checkbox) {
                  checkbox.checked = true;  // Check the checkbox programmatically
                }
              })
            }, 500);
          }
        }
      )
    });
  }

  checkCondition(player: PlayerDetail): Observable<boolean> {
    if (this.selectedPlayers.includes(player.playerId.toString())) return of(false);
    if (this.selectedPlayers.length >= this.teamSize
      || this.creditsLeft < 5
      || Number(player.rating) > this.creditsLeft) {
      return of(true);
    }
    return of(false);
  }

  openDialog(): void {
    const selectedPlayersList = this.playerDetails?.filter(player => this.selectedPlayers.includes(player.playerId));
    const dialogRef = this.dialog.open(SaveTeamDialogComponent, {
      width: '350px',
      data: { selectedPlayersList, weekId: this.weekId, teamId: this.teamId }  // Optional data passing
    });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  onCheckboxChange(selectedPlayer: PlayerDetail) {
    if (this.selectedPlayers.includes(selectedPlayer.playerId.toString())) {
      this.selectedPlayers = this.selectedPlayers.filter(player => player !== selectedPlayer.playerId.toString());
      this.creditsLeft = this.creditsLeft + Number(selectedPlayer.rating)
      selectedPlayer.selected = false;
    }
    else {
      this.selectedPlayers.push(selectedPlayer.playerId.toString());
      this.creditsLeft = this.creditsLeft - Number(selectedPlayer.rating)
      selectedPlayer.selected = true;
    }
    // console.log("selectedPlayers", this.selectedPlayers)
  }

  filteredItems(teamId: string): any {
    return this.playerDetails?.filter(player => player.teamId === teamId);
  }
}