import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

 /**
   *  Get/Set map type filter
   *  Map types: < 'size' | 'docks' | 'bikes' >
   *
   */
@Injectable({
  providedIn: 'root'
})
export class MapTypeService {
  mapType: BehaviorSubject<string> = new BehaviorSubject('size')

  constructor(private http: HttpClient) { }

  public setMapType(type: string): void {
    this.mapType.next(type)
  }
}
