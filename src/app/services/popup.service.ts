import { Station, Available } from './../utils/interface/data_stations'
import { Injectable } from '@angular/core';

/**
 * MAP popup builder
 * @arg: stationData<Station>
 * @arg: availabilityData<Available>
 * @return: popup textContent<string>
 */
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  makePopup(s: Station, a: Available): string {
    return `<div><strong>${s.address}</strong></div>
    <div>${a.is_renting && a.is_returning ? 'En service' : 'Hors service'}</div>
    <div><em>Capacité : ${s.capacity} vélos</em></div>
    <div>Bornes libres : ${a.num_docks_available}</div>
    <div>Vélos disponibles : ${a.num_bikes_available}</div>`
  }

  constructor() { }
}
