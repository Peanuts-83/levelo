import { MapTypeService } from './map-type.service'
import { Available, Station } from './../utils/interface/data_stations'
import { AvaibilityService } from './avaibility.service'
import { PopupService } from './popup.service'
import { HttpClient } from '@angular/common/http'
import { Injectable, OnDestroy } from '@angular/core'
import * as L from 'leaflet'
import { Stations, StationsAvailable } from '../utils/interface/data_stations'
import { BehaviorSubject, Subscription } from 'rxjs'

/**
 * STATIONS builder from public API
 * Adds station marker layers to MAP
 *
 */
@Injectable({
  providedIn: 'root'
})
export class StationService implements OnDestroy {
  private stationsSubscription: Subscription
  private availableSubscription: Subscription
  private maptypeSubscription: Subscription
  private mapType: string
  private markerParam = {
    radius: 0,
    fillcolor: '',
    color: '',
  }
  stations$: BehaviorSubject<Station[]> = new BehaviorSubject([])
  availableList: Available[]
  markerLayers: L.CircleMarker[] = []

  // Stations factory
  makeStations(map: L.Map): void {
    // console.log('Marker Layers START:', map, this.markerLayers.length)
    if (map === null) return
    this.stationsSubscription = this.http.get('https://transport.data.gouv.fr/gbfs/marseille/station_information.json').subscribe({
      next: (res: Stations) => {
        const bikeNum = res.data.stations.map(x => x.capacity)
        const maxBikeNum = Math.max(...bikeNum)

        this.stations$.next(res.data.stations)
        // console.log('Station$ data:', res.data.stations)
        
        // Make marker
        for (let s of res.data.stations) {
          // Get availability data
          const id = s.station_id
          const a = this.availableList.filter((data: Available) => data.station_id === id)[0]

          // MarkerParams size & colors
          const markerParamMaker = () => {
            switch (this.mapType) {
              case 'docks':
                this.markerParam.radius = a.num_docks_available / maxBikeNum * 1.3 +.2
                this.markerParam.fillcolor = '#D4E157'
                this.markerParam.color = '#7CB342'
                break
              case 'bikes':
                this.markerParam.radius = a.num_bikes_available / maxBikeNum * 1.3 +.2
                this.markerParam.fillcolor = '#FFC107'
                this.markerParam.color = '#F57F17'
                break
              default:
                this.markerParam.radius = s.capacity / maxBikeNum * 1.3 +.2
                this.markerParam.fillcolor = '#1E88E5'
                this.markerParam.color = '#1565C0'
                break
            }
          }
          markerParamMaker()

          // Circle marker build
          const lng = s.lon
          const lat = s.lat
          const marker = L.circleMarker([lat, lng], {
            radius: 20 * this.markerParam.radius,
            fillColor: this.markerParam.fillcolor,
            color: this.markerParam.color,
            fillOpacity: .3,
          })

          // Popup build
          const popup = L.popup({
            closeButton: false
          })
            .setLatLng([lat, lng])
            .setContent(this.popupService.makePopup(s, a))
          marker.bindPopup(popup)
          this.markerLayers.push(marker)
        }
        // Add marker (with popup) to map
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
    if (!map) return
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
    this.maptypeSubscription = this.mapTypeService.mapType.subscribe(x => this.mapType = x)
    this.availableSubscription = this.avaibilityService.makeAvailable()
      .subscribe({
        next: (res: StationsAvailable) => this.availableList = res.data.stations,
        error: (err) => console.error(err),
        complete: () => console.log('Avaibility Observable complete')
      })
  }

  ngOnDestroy() {
    this.maptypeSubscription.unsubscribe()
    this.stationsSubscription.unsubscribe()
    this.availableSubscription.unsubscribe()
  }

}
