import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FantasyLeagueService } from './services/fantasy-league.service';
import { PlayerDetail } from './models/player-details.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-fantasy-league-icl';

  constructor(
    private fantasyLeagueService: FantasyLeagueService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.fantasyLeagueService.getWeekDetails();
    this.http.get<PlayerDetail[]>('assets/players.json').subscribe((response) => {
      // this.data = response;
      // response.map(player => {
      //   player.
      // })
      this.fantasyLeagueService.setPlayerDetails(response);
      console.log(response); // Debugging the fetched data
    });
  }


}
