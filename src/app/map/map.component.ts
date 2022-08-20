import { StationService } from './../services/station.service'
import { Component, AfterViewInit } from '@angular/core'
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
  private map: any
  private initMap(): void {
    this.map = L.map('map', {
      center: [43.2928, 5.4334],
      zoom: 13
    })

    const tiles = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="http://thomasranque.com/">Peanuts83</a>'
    })

    tiles.addTo(this.map)
  }



  constructor(private stationService: StationService) { }

  ngAfterViewInit(): void {
    this.initMap()
    this.stationService.makeStations(this.map)
  }

}
