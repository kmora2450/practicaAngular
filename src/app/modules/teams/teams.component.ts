import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Array<any> = []

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    let data = localStorage.getItem('teams')
    if (typeof data === 'string') {
      this.teams = JSON.parse(data)
    } else {
      this.getTeams()
    }
  }

  getTeams(): Observable<any[]> {
    return this.http.get<any>('https://www.narutodb.xyz/api/team', {
      params: {
        limit: 39
      }
    }).pipe(
      // Puedes ajustar el mapeo según la estructura de la respuesta
      map(response => {
        const teams = response.teams;
        localStorage.setItem('teams', JSON.stringify(teams));
        return teams;
      })
    );
  }
}
