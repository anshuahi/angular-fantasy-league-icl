import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeekDetails } from '../components/homepage/homepage.component';

@Injectable({
  providedIn: 'root'
})
export class WeekDetailsService {
  base_url: string = "http://localhost:8080/";
  // "https://infinity-fantasy-league.et.r.appspot.com/";
  constructor(private http: HttpClient) { }

  getWeekDetails() {
    var endpoint = "matches";
    return this.http.get<WeekDetails[]>(this.base_url + endpoint);
  }
}
