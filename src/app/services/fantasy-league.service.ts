import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { WeekDetails } from '../components/homepage/homepage.component';
import { PlayerDetail } from '../models/player-details.model';
import { FantasyTeamRequest } from '../models/fantasy-team-request.model';


@Injectable({
  providedIn: 'root'
})
export class FantasyLeagueService {
  getTeam(weekId: Number) {

  }

  registerMessageSubject = new BehaviorSubject<string>('');
  registerMessage$ = this.registerMessageSubject.asObservable();
  setRegisterSuccessMessage() {
    this.registerMessageSubject.next("See you at Mantra!");
    setTimeout(() => {
      this.registerMessageSubject.next('');
    }, 10000);
  }

  loginUrl = "api/users/login";
  signupUrl = "api/users/register";
  createTeamUrl = "api/fantasy/create-team";
  base_url: string =
    "https://infinity-fantasy-league.et.r.appspot.com/";
  // "http://localhost:8080/";

  authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticatedSubject.asObservable();
  user: any;
  playerDetails: PlayerDetail[] = [];

  setPlayerDetails(playerDetails: PlayerDetail[]) {
    this.playerDetails = playerDetails;
  }

  setUser(user: any) {
    this.user = user;
  }

  // 
  constructor(private http: HttpClient) { }

  getPlayerList() {
    var endpoint = "api/players/all";
    // return this.http.get<any[]>(this.base_url + endpoint);
    return of(this.playerDetails);
  }

  getPlayers() {
    return this.playerDetails;
  }

  getWeekDetails(): Observable<WeekDetails[]> {
    var endpoint = "matches";
    return this.http.get<WeekDetails[]>(this.base_url + endpoint).pipe(
      map(matches => {
        const m = matches.sort((a, b) => Number(a.weekId) - Number(b.weekId))
        return m;
      })
    );
  }

  saveTeam(selectedPlayers: PlayerDetail[], captain: string, viceCaptain: string, weekId: string) {
    const players = selectedPlayers.map(player => player.playerId);
    players.push(captain);
    players.push(viceCaptain);

    const fantasyTeam = {
      selectedPlayers: players,
      weekId: weekId,
      userId: this.user?.phone
    } as FantasyTeamRequest
    // console.log("fantasy team ", fantasyTeam);
    return this.http.post<any>(this.base_url + this.createTeamUrl, fantasyTeam);
  }

  loginUser(phone: string, password: string) {

    const loginBody = { phone: phone, password: password };
    // console.log(loginBody)
    this.authenticatedSubject.next(false);
    this.http.post<any>(this.base_url + this.loginUrl, loginBody).subscribe(
      response => {
        if (response.status === 200) {
          this.user = response.data;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.authenticatedSubject.next(true);
        }
      }
    )
    return true;
  }

  signupUser(username: string, fullName: string, email: string, phone: string, password: string) {
    const signupBody = { username, fullName, email, phone, password }
    // console.log(signupBody);
    return this.http.post<any>(this.base_url + this.signupUrl, signupBody);

    // .subscribe(response => {
    //   console.log(response);
    //   if (response.status === 200) {
    //     this.user = response.data;
    //     this.authenticatedSubject.next(true);
    //   }
    // });
  }

  getUser() {
    return this.user;
  }
  setUserAuthentication(user: string) {
    // console.log("user authenticated from chrom local storage")
    this.authenticatedSubject.next(true);
    this.user = JSON.parse(user);
    // console.log(this.user);
  }

  // setUserAuthentication(user: any) {
  //   // console.log("user authenticated from chrom local storage")
  //   this.authenticatedSubject.next(true);
  //   this.user = JSON.parse(user);
  //   console.log(this.user);
  // }
}
