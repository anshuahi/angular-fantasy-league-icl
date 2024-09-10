import { Component, Input } from '@angular/core';
import { WeekDay } from '../homepage/homepage.component';
import { MatchInfoComponent } from "./match-info/match-info.component";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-match-day',
  standalone: true,
  imports: [MatchInfoComponent, MatButtonModule],
  templateUrl: './match-day.component.html',
  styleUrl: './match-day.component.scss'
})
export class MatchDayComponent {
  @Input() weekDay!: WeekDay
}
