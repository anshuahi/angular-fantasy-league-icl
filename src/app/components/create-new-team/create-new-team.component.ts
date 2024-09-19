import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PlayerDetail, PlayerDetailsService } from '../../services/player-details.service';
import { BehaviorSubject, filter, map, Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TeamPipe } from '../../pipes/team.pipe';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-new-team',
  standalone: true,
  imports: [HttpClientModule, CommonModule, TeamPipe, MatCardModule],
  templateUrl: './create-new-team.component.html',
  styleUrl: './create-new-team.component.scss'
})
export class CreateNewTeamComponent implements OnInit {
  onCheckboxChange(selectedPlayer: PlayerDetail) {
    console.log(selectedPlayer);
    if (this.selectedPlayers.includes(selectedPlayer.playerId)) {
      this.selectedPlayers = this.selectedPlayers.filter(player => player !== selectedPlayer.playerId)
    }
    else {
      this.selectedPlayers.push(selectedPlayer.playerId);
    }
  }

  constructor(
    private http: HttpClient,
    private playerDetailsService: PlayerDetailsService,
  ) { }

  playerDetailsSubject = new BehaviorSubject<PlayerDetail[]>([]);
  playerDetails$: Observable<PlayerDetail[]> = this.playerDetailsService.getPlayerList();
  // this.playerDetailsSubject.asObservable();
  playerDetails!: PlayerDetail[];
  teams: string[] = ["NB", "LE", "IJ", "DW", "HU", "PR"];

  selectedPlayers: string[] = [];

  ngOnInit(): void {
    setTimeout(() => {
      this.playerDetails = this.playerDetailsService.getPlayers();
      console.log("this.playerDetails", this.playerDetails);
    }, 2000);
    this.playerDetailsSubject.next(this.playerDetails);
  }

  checkCondition(player: PlayerDetail): Observable<boolean> {
    if (this.selectedPlayers.includes(player.playerId)) return of(false);
    if (this.selectedPlayers.length == 5) {
      return of(true);
    }
    return of(false);
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
    // console.log("team ", team);
    // return team;
  }
}