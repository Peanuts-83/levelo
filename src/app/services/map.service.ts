import { Injectable } from '@angular/core'
import * as L from 'leaflet'

/**
 * MAP INIT WITH Leaflet
 * mapLayer + tileLayer
 * @arg: coords[lat<number>, lng<number>]
 * @arg: zoom<number>
 * @return L.MAP
 *
 * options :
 *  center <latlng>
 *  zoom <1 to 18>
 *  maxZoom/minZoom
 *  attributions ©
 */
@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: L.Map
  zoom: number = 13

  initMap(coords: L.LatLngExpression): L.Map {
    this.map = L.map('map', {
      center: coords,
      zoom: this.zoom
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
