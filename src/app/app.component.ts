import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HttpClientModule } from '@angular/common/http';
import { WeekDetailsService } from './services/week-details.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'angular-fantasy-league-icl';
  constructor(private weekdayService: WeekDetailsService) { }

  ngOnInit(): void {
    this.weekdayService.getWeekDetails();
  }


}
