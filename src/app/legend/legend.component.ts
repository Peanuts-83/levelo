import { MapTypeService } from './../services/map-type.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { StationService } from '../services/station.service'
import { Station } from '../utils/interface/data_stations'
import { Observable, startWith, Subscription } from 'rxjs'
import {pairwise} from 'rxjs/operators'

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  form: FormGroup
  private stations: Station[]
  private namesList: string[] = []
  filteredNames: string[] = []
  private oldSearch = ''
  search
  searchSubscription: Subscription

  makeNamesList() {
    if (this.stations) {
      console.log('STATIONS', this.stations.map(station => station.name))
      this.namesList = this.stations.map(station => {
        return station.name
          .toLowerCase()
          .replace(/-/g, '')
          .replace(/\d/g, '')
      })
    }
    return null
  }

  updateNamesList(e: string) {
    // console.log(e)
    if (e.length < this.oldSearch.length) {
      this.filteredNames = this.namesList.filter(name => name.includes(e.toLowerCase()))
    }
    this.filteredNames = this.filteredNames.length > 0 ?
      this.filteredNames.filter(name => name.includes(e.toLowerCase())) :
      this.namesList.filter(name => name.includes(e.toLowerCase()))
    this.oldSearch = e
  }

  targetStation(e?, args?) {
    let searchName: string
    if (e) {
      searchName = e.trim().toLowerCase()
    } else {
      // this.search.subscribe(x => searchName = x.trim().toLowerCase() )
    }
    console.log('TARGET name:', searchName, this.stations)
    const result = this.stations.filter(station => station.name.toLowerCase().includes(searchName))[0]
    console.log('TARGET coords: ', result.lon, result.lat)

  }

  changeType(e) {
    this.mapTypeService.setMapType(e.value)
  }

  constructor(
    private formBuilder: FormBuilder,
    private stationService: StationService,
    private mapTypeService: MapTypeService) { }

  ngOnInit(): void {
    this.stationService.stations$.subscribe(x => {
      this.stations = x
      this.makeNamesList()
    })

    this.form = this.formBuilder.group({
      radio: ['size'],
      search: ['']
    })

    this.searchSubscription = this.form.get('search')
      .valueChanges
      .subscribe({
        next: x => {
          console.log('Value:', x)
          this.search = x
          this.updateNamesList(this.search)
        },
        complete: () => console.log("searchSubscription complete")
      })
  }

}
