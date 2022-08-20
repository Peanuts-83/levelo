import { Injectable } from '@angular/core';
import * as L from 'leaflet'

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: any
  
  initMap(): void {
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
    return this.map
  }

  constructor() { }
}
