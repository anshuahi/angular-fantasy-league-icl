import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeekDetailsService {
  base_url: string = "localhost:8080/";
  // "https://infinity-fantasy-league.et.r.appspot.com/";
  constructor(private http: HttpClient) { }

  getWeekDetails() {
    var endpoint = "matches";
    this.http.get(this.base_url + endpoint).subscribe(
      a => console.log(a)
    )
  }
}
