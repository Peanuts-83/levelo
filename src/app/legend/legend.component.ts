import { MapTypeService } from './../services/map-type.service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { StationService } from '../services/station.service'
import { Station } from '../utils/interface/data_stations'
import { Subscription } from 'rxjs'
import { MatRadioChange } from '@angular/material/radio'

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit, OnDestroy {
  searchForm: FormGroup
  private stations: Station[]
  private namesList: string[] = []
  filteredNames: string[] = []
  private oldSearch = ''
  search: string = '-'
  private searchSubscription: Subscription

  changeType(e: MatRadioChange) {
    this.mapTypeService.setMapType(e.value)
  }

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
    if (e.length < this.oldSearch.length) {
      this.filteredNames = this.namesList.filter(name => name.includes(e.toLowerCase()))
    }
    this.filteredNames = this.filteredNames.length > 0 ?
      this.filteredNames.filter(name => name.includes(e.toLowerCase())) :
      this.namesList.filter(name => name.includes(e.toLowerCase()))
    this.oldSearch = e
  }

  targetStation() {
    let searchName: string = this.search.trim().toLowerCase().replace(/\s\s/g, ' ')
    const result = this.stations.filter(station => {
      let counter = 0
      for (let word of searchName.split(' ')) {
        if (station.name.toLowerCase().includes(word)) {
          counter++
        }
      }
      if (counter === searchName.split(' ').length) {
        return station
      }
      return null
    })

    if (result.length < 1) {
      this.alertResult()
    } else {
      this.zoomResult(result[0])
    }
  }

  alertResult() {
    console.log('No Result');
  }

  zoomResult(targetStation: Station) {
    console.log(targetStation);
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

    this.searchForm = this.formBuilder.group({
      radio: ['size'],
      search: ['']
    })

    this.searchSubscription = this.searchForm.get('search')
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

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe()
  }
}
