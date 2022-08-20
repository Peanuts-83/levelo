import { MapTypeService } from './map-type.service'
import { Available, Station } from './../utils/interface/data_stations'
import { AvaibilityService } from './avaibility.service'
import { PopupService } from './popup.service'
import { HttpClient } from '@angular/common/http'
import { Injectable, OnDestroy, OnInit } from '@angular/core'
import * as L from 'leaflet'
import { Stations, StationsAvailable } from '../utils/interface/data_stations'
import { BehaviorSubject, Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class StationService implements OnDestroy {
  private sub1$: Subscription
  private sub2$: Subscription
  private mapType: string
  private markerParam = {
    radius: 0,
    fillcolor: '',
    color: '',
  }
  stations$: BehaviorSubject<Station[]> = new BehaviorSubject([])
  availableList: Available[]
  markerLayers: L.Layer[] = []

  makeStations(map: L.Map): void {
    this.sub1$ = this.http.get('https://transport.data.gouv.fr/gbfs/marseille/station_information.json').subscribe({
      next: (res: Stations) => {
        const bikeNum = res.data.stations.map(x => x.capacity)
        const maxBikeNum = Math.max(...bikeNum)
        this.stations$.next(res.data.stations)


        // Make marker
        for (let s of res.data.stations) {
          // Get availability data
          const id = s.station_id
          const a = this.availableList.filter((data: Available) => data.station_id === id)[0]

          // MarkerParams
          const markerParamMaker = () => {
            switch (this.mapType) {
              case 'docks':
                this.markerParam.radius = a.num_docks_available / s.capacity
                this.markerParam.fillcolor = '#FFC107'
                this.markerParam.color = '#F57F17'
                break
              case 'bikes':
                this.markerParam.radius = a.num_bikes_available / s.capacity
                this.markerParam.fillcolor = '#EF6C00'
                this.markerParam.color = '#E65100'
                break
              default:
                this.markerParam.radius = s.capacity / maxBikeNum
                this.markerParam.fillcolor = '#D4E157'
                this.markerParam.color = '#7CB342'
                break
            }
          }
          markerParamMaker()

          const lon = s.lon
          const lat = s.lat
          const marker = L.circleMarker([lat, lon], {
            radius: 20 * this.markerParam.radius,
            fillColor: this.markerParam.fillcolor,
            color: this.markerParam.color,
            fillOpacity: .5
          })

          // Make popup
          marker.bindPopup(this.popupService.makePopup(s, a))
          this.markerLayers.push(marker)
        }
        // Add marker to map
        for (let layer of this.markerLayers) {
          layer.addTo(map)
        }
      },
      error: (err) => { console.error(err) },
      complete: () => { console.log('Station Observable complete') }
    })
  }

  // Delete markers on change mapType
  delStations(map: L.Map) {
    for (let layer of this.markerLayers) {
      map.removeLayer(layer)
    }
    this.markerLayers = []
  }

  constructor(
    private http: HttpClient,
    private popupService: PopupService,
    private avaibilityService: AvaibilityService,
    private mapTypeService: MapTypeService) {
    this.mapTypeService.mapType.subscribe(x => this.mapType = x)
    this.sub2$ = this.avaibilityService.makeAvailable()
      .subscribe({
        next: (res: StationsAvailable) => this.availableList = res.data.stations,
        error: (err) => console.error(err),
        complete: () => console.log('Avaibility Observable complete')
      })
  }

  ngOnDestroy() {
    this.sub1$.unsubscribe()
    this.sub2$.unsubscribe()
  }

}
