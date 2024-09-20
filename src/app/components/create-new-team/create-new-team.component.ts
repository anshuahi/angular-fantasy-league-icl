import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FantasyLeagueService } from '../../services/fantasy-league.service';
import { BehaviorSubject, filter, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TeamPipe } from '../../pipes/team.pipe';
import { MatCardModule } from '@angular/material/card';
import { PreviewTeamDialogComponent } from '../../dialogs/preview-team/preview-team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PlayerDetail } from '../../models/player-details.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-new-team',
  standalone: true,
  imports: [HttpClientModule, CommonModule, TeamPipe, MatCardModule, FormsModule, MatButtonModule],
  templateUrl: './create-new-team.component.html',
  styleUrl: './create-new-team.component.scss'
})
export class CreateNewTeamComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private playerDetailsService: FantasyLeagueService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  teamSize: number = 10;
  playerDetailsSubject = new BehaviorSubject<PlayerDetail[]>([]);
  playerDetails$: Observable<PlayerDetail[]> = this.playerDetailsService.getPlayerList();
  playerDetails!: PlayerDetail[];
  teams: string[] = ["NB", "LE", "IJ", "DW", "HU", "PR"];
  creditsLeft: number = 80;

  selectedPlayers: string[] = [];
  weekId!: string;
  ngOnInit(): void {
    setTimeout(() => {
      this.playerDetails = this.playerDetailsService.getPlayers();
    }, 2000);
    this.playerDetailsSubject.next(this.playerDetails);

    this.route.paramMap.subscribe(params => {
      this.weekId = params.get('id')!;
    });
  }

  checkCondition(player: PlayerDetail): Observable<boolean> {
    if (this.selectedPlayers.includes(player.playerId)) return of(false);
    if (this.selectedPlayers.length == this.teamSize || this.creditsLeft < 6 || Number(player.rating) > this.creditsLeft) {
      return of(true);
    }
    return of(false);
  }

  openDialog(): void {
    const selectedPlayersList = this.playerDetails?.filter(player => player.selected);
    const dialogRef = this.dialog.open(PreviewTeamDialogComponent, {
      width: '350px',
      data: { selectedPlayersList, weekId: this.weekId }  // Optional data passing
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onCheckboxChange(selectedPlayer: PlayerDetail) {
    if (this.selectedPlayers.includes(selectedPlayer.playerId)) {
      this.selectedPlayers = this.selectedPlayers.filter(player => player !== selectedPlayer.playerId);
      this.creditsLeft = this.creditsLeft + Number(selectedPlayer.rating)
      selectedPlayer.selected = false;
    }
    else {
      this.selectedPlayers.push(selectedPlayer.playerId);
      this.creditsLeft = this.creditsLeft - Number(selectedPlayer.rating)
      selectedPlayer.selected = true;
    }
  }

  filteredItems(teamId: string): any {
    // setTimeout(() => {
    // }, 5000);
    return this.playerDetails?.filter(player => player.teamId === teamId);
    // const filteredTeam = this.playerDetails$.pipe(
    //   map((players: PlayerDetail[]) =>
    //     players.filter(player => player.teamId === teamId)
    //   )
    // )
    // return filteredTeam;
    // return this.playerDetailsSubject.value?.
    //   sort((a, b) => a.name.localeCompare(b.name))
    //   .filter(player => player.teamId === teamId);
    // return this.playerDetails$.pipe(
    //   map((playerDetails: PlayerDetail[]) =>
    //     playerDetails.filter(player => player?.teamId === teamId)
    //   )
    // )
    // ?.filter(player => player.teamId === teamId);
    // return team;
  }
}