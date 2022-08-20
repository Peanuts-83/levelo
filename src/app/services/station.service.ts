import { MapTypeService } from './map-type.service'
import { Available, Station } from './../utils/interface/data_stations'
import { AvaibilityService } from './avaibility.service'
import { PopupService } from './popup.service'
import { HttpClient } from '@angular/common/http'
import { Injectable, OnDestroy, OnInit } from '@angular/core'
import * as L from 'leaflet'
import { Stations, StationsAvailable } from '../utils/interface/data_stations'
import { Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StationService implements OnDestroy {
  sub1: Subscription
  sub2: Subscription
  availableList: Available[]

  makeStations(map: L.Map): void {
    this.sub1 = this.http.get('https://transport.data.gouv.fr/gbfs/marseille/station_information.json').subscribe({
      next: (res: Stations) => {
        const bikeNum = res.data.stations.map(x => x.capacity)
        const maxBikeNum = Math.max(...bikeNum)

        // Make marker
        for (let s of res.data.stations) {
          const lon = s.lon
          const lat = s.lat
          const marker = L.circleMarker([lat, lon], {
            radius: 20 * (s.capacity / maxBikeNum),
            fillColor: 'greenyellow',
            color: 'grey',
            fillOpacity: .5
          })

          // Get availability data
          const id = s.station_id
          const a = this.availableList.filter((data: Available) => data.station_id === id)[0]

          // Make popup
          marker.bindPopup(this.popupService.makePopup(s, a))

          // Add marker to map
          marker.addTo(map)
        }
      },
      error: (err) => { console.error(err) },
      complete: () => { console.log('Station Observable complete') }
    })
  }

  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private avaibilityService: AvaibilityService,
    private mapTypeService: MapTypeService) {
    this.sub2 = this.avaibilityService.makeAvailable()
      .subscribe({
        next: (res: StationsAvailable) => this.availableList = res.data.stations,
        error: (err) => console.error(err),
        complete: () => console.log('Avaibility Observable complete')
      })
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }

}
