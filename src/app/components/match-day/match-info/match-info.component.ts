import { Component, Input } from '@angular/core';
import { Match } from '../../homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { TeamPipe } from '../../../pipes/team.pipe';

@Component({
  selector: 'app-match-info',
  standalone: true,
  imports: [CommonModule, TeamPipe],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.scss'
})
export class MatchInfoComponent {
  @Input() team1!: string;
  @Input() team2!: string;
}
