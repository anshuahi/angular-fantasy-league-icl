import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';


export interface PlayerDetail {
  playerId: string,
  teamId: string,
  name: string,
  teamName: string,
  role: string,
  rating: string,
}

@Injectable({
  providedIn: 'root'
})
export class PlayerDetailsService {

  playerDetails!: PlayerDetail[];
  setPlayerDetails(playerDetails: PlayerDetail[]) {
    this.playerDetails = playerDetails;
  }

  base_url: string = "http://localhost:8080/";
  // "https://infinity-fantasy-league.et.r.appspot.com/";
  constructor(private http: HttpClient) { }

  getPlayerList() {
    var endpoint = "api/players/all";
    // return this.http.get<any[]>(this.base_url + endpoint);
    return of(this.playerDetails);
  }


  getPlayers() {
    return this.playerDetails;
  }
}
