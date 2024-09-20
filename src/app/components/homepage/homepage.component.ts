import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { MatchDayComponent } from "../match-day/match-day.component";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FantasyLeagueService } from '../../services/fantasy-league.service';
import { Router } from '@angular/router';
// import { WeekDay } from '@angular/common';


export interface Match {
  team1: string,
  team2: string
}

export interface WeekDay {
  weekId: string,
  match1: Match,
  match2: Match,
  match3: Match,
}

export interface WeekDetails {
  cutOffTime: string,
  teamFive: string,
  teamFour: string,
  teamOne: string,
  teamSix: string,
  teamThree: string,
  teamTwo: string,
  weekId: Number,
  weekName: string,
}


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, MatchDayComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  weekDetailsSubject = new BehaviorSubject<WeekDetails[]>([]);
  weekDetails$: Observable<WeekDetails[]> = this.weekDetailsSubject.asObservable();

  constructor(private fantasyLeagueService: FantasyLeagueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fantasyLeagueService.getWeekDetails().subscribe(weekDetails => {
      this.weekDetailsSubject.next(weekDetails);
    });

    this.fantasyLeagueService.authenticated$.subscribe(a => {
      if (!a) {
        this.router.navigate(['/login']);
      }
    })
  }


}
