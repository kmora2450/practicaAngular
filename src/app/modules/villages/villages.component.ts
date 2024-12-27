import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-villages',
  templateUrl: './villages.component.html',
  styleUrls: ['./villages.component.css']
})
export class VillagesComponent implements OnInit {
  villages: Array<any> = []

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    let data = localStorage.getItem('villages')
    if (typeof data === 'string') {
      this.villages = JSON.parse(data)
    } else {
      this.getVillages()
    }
  }

  getVillages(): Observable<any[]> {
    return this.http.get<any>('https://narutodb.xyz/api/village', {
      params: {
        limit: 39
      }
    }).pipe(
      // Puedes ajustar el mapeo según la estructura de la respuesta
      map(response => {
        const villages = response.villages;
        localStorage.setItem('villages', JSON.stringify(villages));
        return villages;
      })
    );
  }

  // getVillages() {
  //   this.http.get('https://narutodb.xyz/api/village', {

  //     params: {
  //       limit: 39
  //     }
  //   })
  //     .subscribe((response: any) => {
  //       this.villages = response.villages
  //       localStorage.setItem('villages', JSON.stringify(this.villages))
  //     })
  // }
}
