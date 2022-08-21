import { MapTypeService } from './../services/map-type.service'
import { MapService } from './../services/map.service'
import { StationService } from './../services/station.service'
import { Component, AfterViewInit, ViewChild } from '@angular/core'
import * as L from 'leaflet'

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map: L.Map
  mapType: string

  constructor(
    private stationService: StationService,
    private mapService: MapService,
    private mapTypeService: MapTypeService) { }

  ngAfterViewInit(): void {
    this.map = this.mapService.initMap([43.2928, 5.4334], 13)
    this.stationService.makeStations(this.map)
    this.mapTypeService.mapType.subscribe(x => {
      if (this.mapType !== x) {
        this.mapType = x
        this.stationService.delStations(this.map)
        this.stationService.makeStations(this.map)
      }
    })
  }

  zoom = (marker: L.CircleMarker): void => {
    marker.openPopup()
    this.map.zoomIn(15)
    this.map.panTo(marker.getLatLng())
  }

}
