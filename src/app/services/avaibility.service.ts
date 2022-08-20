import { StationsAvailable, Available } from './../utils/interface/data_stations'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AvaibilityService {
  makeAvailable() {
    return this.http.get('https://transport.data.gouv.fr/gbfs/marseille/station_status.json')
  }

  constructor(private http: HttpClient) { }
}
