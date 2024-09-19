import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { PlayerDetail, PlayerDetailsService } from '../../services/player-details.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-team-dialog',
  standalone: true,
  imports: [MatDialogModule, MatCardModule, MatSelectModule, FormsModule, CommonModule],
  templateUrl: './create-team-dialog.component.html',
  styleUrl: './create-team-dialog.component.scss'
})
export class CreateTeamDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateTeamDialogComponent>,
    private http: HttpClient,
    private playerDetailsService: PlayerDetailsService,
  ) { }

  playerDetailsSubject = new BehaviorSubject<PlayerDetail[]>([]);
  playerDetails$ = this.playerDetailsSubject.asObservable();
  selectedPlayers: any;
  playerDetails!: PlayerDetail[];

  ngOnInit(): void {
    // this.playerDetails = this.playerDetailsService.getPlayerList();
    // this.playerDetailsSubject.next(this.playerDetails);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
