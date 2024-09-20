import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
  authenticated$ = this.fantasyLeagueService.authenticated$;

  constructor(
    private fantasyLeagueService: FantasyLeagueService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      // console.log(user);
      this.fantasyLeagueService.setUserAuthentication(user);
      this.router.navigate(['/']);
    }
    this.fantasyLeagueService.getWeekDetails();
    this.http.get<PlayerDetail[]>('assets/players.json').subscribe((response) => {
      this.fantasyLeagueService.setPlayerDetails(response);
      // console.log(response); // Debugging the fetched data
    });
  }
}
