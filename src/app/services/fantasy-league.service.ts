import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, pipe } from 'rxjs';
import { MatchDetailsResponse, WeekDetails } from '../components/homepage/homepage.component';
import { PlayerDetail } from '../models/player-details.model';
import { FantasyTeamRequest } from '../models/fantasy-team-request.model';
import { User } from '../models/user.model';
import { LeaderboardFantasyTeam, LeaderboardResponse } from '../models/leaderboard-response.mode';
import { TeamPipe } from '../pipes/team.pipe';


@Injectable({
  providedIn: 'root'
})
export class FantasyLeagueService {
  weekDetails!: WeekDetails[];

  getTeamsByMatch(weekId: string): string[] {
    const matches = this.weekDetails.filter(week => week.weekId.toString() == weekId);
    console.log(matches);
    if (matches.length) {
      return [matches[0].team1, matches[0].team2, matches[0].team3, matches[0].team4, matches[0].team5, matches[0].team6]
    }
    return [];
  }

  getTeamByTeamId(teamId: string) {
    const endPoint = "api/fantasy/";
    return this.http.get<any>(this.base_url + endPoint + teamId);
  }

  getTeamByWeekId(weekId: string) {
    const endPoint = "api/fantasy/get-team/";
    const body = {
      weekId: weekId,
      userId: this.user.phone
    }
    return this.http.get<LeaderboardFantasyTeam>(this.base_url + endPoint + weekId + "/" + this.user.phone);
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
    // "https://infinity-fantasy-league.et.r.appspot.com/";
    "http://localhost:8080/";

  authenticatedSubject = new BehaviorSubject<boolean>(false);
  authenticated$ = this.authenticatedSubject.asObservable();
  user!: User;
  playerDetails: PlayerDetail[] = [];


  setPlayerDetails(playerDetails: PlayerDetail[]) {
    this.playerDetails = playerDetails;
  }

  setUser(user: any) {
    this.user = user;
  }

  getUserDetails() {
    if (this.user) {
      const endPoint = "api/users/";
      this.http.get<any>(this.base_url + endPoint + this.user.phone).subscribe(
        user => {
          // console.log(user);
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      )
    }
  }


  getTeamId(weekId: string) {
    // console.log(this.user);
    const idx = this.user.weekIds.findIndex(week => week === weekId);
    return this.user.fantasyTeams[idx];
  }
  // 
  constructor(private http: HttpClient) { }

  getPlayerList() {
    var endpoint = "api/players/all";
    return this.http.get<PlayerDetail[]>(this.base_url + endpoint)
      .subscribe((response: PlayerDetail[]) => {
        // console.log(response);
        this.playerDetails = response.sort(
          (a, b) => (a.name).localeCompare(b.name)
        ).map(resp => {
          return {
            playerId: resp.playerId.toString(),
            teamId: resp.teamId,
            name: resp.name,
            teamName: resp.teamName,
            role: resp.role,
            rating: resp.rating,
            selected: resp.selected,
            cricheroesName: resp.cricheroesName
          }
        });
        // console.log(this.playerDetails)
      })
  }

  getPlayers() {
    return this.playerDetails;
  }

  getWeekDetails(): Observable<WeekDetails[]> {
    var endpoint = "matches/all-matches";
    return this.http.get<MatchDetailsResponse>(this.base_url + endpoint).pipe(
      map(response => {
        if (response.status === 200) {
          const matches = response?.matchesPerWeek || [];
          const m = matches.sort((a, b) => Number(a.weekId) - Number(b.weekId))
          this.weekDetails = m;
          return m;
        }
        else {
          return response?.matchesPerWeek;
        }
      })
    );
  }

  getLeaderboardDetails(weekId: string) {
    var endpoint = "api/leaderboard/weekly/" + weekId;
    return this.http.get<LeaderboardResponse>(this.base_url + endpoint)
  }

  saveTeam(selectedPlayers: PlayerDetail[], captain: string, viceCaptain: string, weekId: string, teamId: string) {
    const players = selectedPlayers.map(player => player.playerId);
    players.push(captain);
    players.push(viceCaptain);

    const fantasyTeam = {
      selectedPlayers: players,
      weekId: weekId,
      userId: this.user?.phone,
      teamId: teamId
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
        else {
          this.registerMessageSubject.next(response.message);
          setTimeout(() => {
            this.registerMessageSubject.next("");
          }, 5000);
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


  getMvpBoard() {
    // this.setMatchDayPoints();
  }

  setMatchDayPoints() {
    this.http.get<any>('assets/oct19.json').subscribe(a => {
      // console.log(a);
      a.forEach((el: any) => {
        const body = {
          weekId: "5",
          name: el?.name,
          playerId: el?.player_id,
          battingPoints: el?.battingPoints,
          bowlingPoints: el?.bowlingPoints,
          fieldingPoints: el?.fieldingPoints,
          playerPoints: el?.playerPoints,
        }
        console.log(body);
        // this.http.post(this.base_url + "api/players/update_player", body).subscribe(x => console.log(x));
      });
    });
  }

  getTeamIds(num: Number) {
    switch (num) {
      case 5819087:
        return "NB";
      case 7349628:
        return "LE";
      case 5804668:
        return "IJ";
      case 7349687:
        return "DW";
      case 5820628:
        return "HU";
      case 7349618:
        return "PR";

      default:
        return "num";
    }
  }

  getTeamName(teamId: string) {
    switch (teamId) {
      case "NB":
        return "NewBies";
      case "LE":
        return "Legends";
      case "IJ":
        return "Juggernauts";
      case "DW":
        return "Warriors";
      case "HU":
        return "Hustlers";
      case "PR":
        return "Predators";

      default:
        return teamId;
    }
  }

  getName(player: PlayerDetail, a: any) {
    console.log(player.name);
    const x = a.findIndex((a1: any) => player.name === a1?.name);
    return a[x]?.cricheroesName;
  }

}
