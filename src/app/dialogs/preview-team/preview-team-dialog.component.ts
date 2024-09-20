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
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { selectedPlayersList: PlayerDetail[], weekId: string, teamId: string },
    private fantasyLeagueService: FantasyLeagueService,
  ) { }

  playerDetailsSubject = new BehaviorSubject<PlayerDetail[]>([]);
  playerDetails$ = this.playerDetailsSubject.asObservable();
  selectedPlayers: any;
  playerDetails!: PlayerDetail[];
  captain: string = '';
  viceCaptain: string = '';

  ngOnInit(): void {
    // console.log("preview data", this.data);
    this.selectedPlayers = this.data?.selectedPlayersList
    // console.log(this.selectedPlayers);
    // this.data = this.data?.sort((a, b) => a?.teamId.localeCompare(b?.teamId));
  }

  onClose(): void {
    this.dialogRef.close();
  }

  checkCaptainCondition(player: PlayerDetail): Observable<boolean> {
    if (player.playerId === this.captain) return of(false);
    if (player.playerId === this.viceCaptain) return of(true);
    if (this.captain !== "") return of(true);
    return of(false);
  }
  checkViceCaptainCondition(player: PlayerDetail): Observable<boolean> {
    if (player.playerId === this.viceCaptain) return of(false);
    if (player.playerId === this.captain) return of(true);
    if (this.viceCaptain !== "") return of(true);
    return of(false);
  }

  onCaptainCheckboxChange(selectedPlayer: PlayerDetail) {
    // console.log(selectedPlayer);
    if (this.captain === selectedPlayer.playerId) {
      this.captain = '';
      return;
    }
    this.captain = selectedPlayer.playerId;
  }

  onViceCaptainCheckboxChange(selectedPlayer: PlayerDetail) {
    // console.log(selectedPlayer);
    if (this.viceCaptain === selectedPlayer.playerId) {
      this.viceCaptain = '';
      return;
    }
    this.viceCaptain = selectedPlayer.playerId;
  }

  saveTeam() {
    // console.log(this.selectedPlayers, this.captain, this.viceCaptain);
    // console.log(this.selectedPlayers, this.captain, this.viceCaptain, this.data.weekId);
    this.fantasyLeagueService.saveTeam(this.selectedPlayers, this.captain, this.viceCaptain, this.data.weekId, this.data.teamId).subscribe(
      (response) => {
        // console.log(response);
        if (response.status === 200) {
          this.onClose();
          this.router.navigate(['/']);
        }
      }
    );
  }
}
