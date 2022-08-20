import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MapTypeService {
  mapType: BehaviorSubject<string> = new BehaviorSubject('size')
  /**
   *  types: < size | docks | bikes >
   *
   */

  constructor(private http: HttpClient) { }

  public setMapType(type: string): void {
    this.mapType.next(type)
  }
}
