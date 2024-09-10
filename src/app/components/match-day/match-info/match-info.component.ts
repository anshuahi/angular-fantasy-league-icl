import { Component, Input } from '@angular/core';
import { Match } from '../../homepage/homepage.component';

@Component({
  selector: 'app-match-info',
  standalone: true,
  imports: [],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.scss'
})
export class MatchInfoComponent {
  @Input() match!: Match
}
