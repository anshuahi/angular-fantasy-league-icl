import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { WeekDetails } from '../components/homepage/homepage.component';
import { PlayerDetail } from '../models/player-details.model';


@Injectable({
  providedIn: 'root'
})
export class FantasyLeagueService {

  playerDetails: PlayerDetail[] = [];
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

  getWeekDetails() {
    var endpoint = "matches";
    return this.http.get<WeekDetails[]>(this.base_url + endpoint);
  }

  saveTeam() {

  }

  loginUser(email: string, password: string) {
    // throw new Error('Method not implemented.');
    return true;
  }
}
