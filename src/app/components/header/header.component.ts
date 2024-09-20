import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FantasyLeagueService } from '../../services/fantasy-league.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  logout() {
    console.log("logout");
    localStorage.removeItem("user");
    this.fantasyLeagueService.authenticatedSubject.next(false)
    this.router.navigate(['/login']);
  }

  authenticated$ = this.fantasyLeagueService.authenticated$;
  user = this.fantasyLeagueService.getUser();

  constructor(
    private fantasyLeagueService: FantasyLeagueService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fantasyLeagueService.authenticated$.subscribe(a => {
      // console.log("authenticated ", a)
      setTimeout(() => {
        this.user = this.fantasyLeagueService.getUser();
      }, 1000);
      // console.log(this.user);
    });
  }
  login = 'login';
}
