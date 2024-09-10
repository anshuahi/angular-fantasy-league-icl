import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { MatchDayComponent } from "../match-day/match-day.component";
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

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, MatchDayComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  ngOnInit(): void {
    var week = {
      weekId: '1',
      match1: { team1: "A", team2: "B" },
      match2: { team1: "A", team2: "B" },
      match3: { team1: "A", team2: "B" },
    } as WeekDay
    this.weekdays.push(week);
    week = { ...week, weekId: '2' };
    this.weekdays.push(week);
    week = { ...week, weekId: '3' };
    this.weekdays.push(week);
    week = { ...week, weekId: '4' };
    this.weekdays.push(week);
    week = { ...week, weekId: '5' };
    this.weekdays.push(week);
    week = { ...week, weekId: '6' };
    this.weekdays.push(week);
    week = { ...week, weekId: '7' };
    this.weekdays.push(week);
    console.log(this.weekdays)
  }


  weekdays: WeekDay[] = [];

}
