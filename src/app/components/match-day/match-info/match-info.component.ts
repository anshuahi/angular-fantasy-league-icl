import { Component, Input } from '@angular/core';
import { Match } from '../../homepage/homepage.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.scss'
})
export class MatchInfoComponent {
  @Input() team1!: String;
  @Input() team2!: String;
}
