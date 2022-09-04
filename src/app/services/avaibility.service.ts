import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

/**
 * Get availability by station from public API
 *
 * data: {
 *  stations: [{
    * "is_installed":1,
    * "is_renting":1,
    * "is_returning":1,
    * "last_reported":1661964180,
    * "num_bikes_available":1,
    * "num_docks_available":18,
    * "station_id":"8149"
 *  },{...}]
 * }
 */
@Injectable({
  providedIn: 'root'
})
export class AvaibilityService {
  makeAvailable() {
    return this.http.get('https://transport.data.gouv.fr/gbfs/marseille/station_status.json')
  }

  constructor(private http: HttpClient) { }
}
