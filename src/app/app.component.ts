import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { WeekDetailsService } from './services/week-details.service';
import { PlayerDetail, PlayerDetailsService } from './services/player-details.service';

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
    private weekdayService: WeekDetailsService,
    private http: HttpClient,
    private playerDetailsService: PlayerDetailsService
  ) { }

  ngOnInit(): void {
    this.weekdayService.getWeekDetails();
    this.http.get<PlayerDetail[]>('assets/players.json').subscribe((response) => {
      // this.data = response;
      // response.map(player => {
      //   player.
      // })
      console.log(response); // Debugging the fetched data
    });
  }


}
