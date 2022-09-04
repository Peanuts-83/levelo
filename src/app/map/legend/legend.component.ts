import { MapTypeService } from '../../services/map-type.service'
import { Component, OnInit, OnDestroy, Input, ViewChild, ElementRef } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { StationService } from '../../services/station.service'
import { Station } from '../../utils/interface/data_stations'
import { Subscription } from 'rxjs'
import { MatRadioChange } from '@angular/material/radio'
import * as L from 'leaflet'

/**
 * Filter & Search component
 *
 */
@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit, OnDestroy {
  @Input() zoom: (marker: L.CircleMarker) => void
  @ViewChild('error') error: ElementRef<HTMLElement>
  @ViewChild('input') input: ElementRef<HTMLInputElement>
  private searchSubscription: Subscription
  searchForm: FormGroup
  private stations: Station[]
  private namesList: string[] = []
  filteredNames: string[] = []
  private oldSearch = ''
  search: string = '-'


  // SEARCH STATION - Input //
  // Stations' name builder
  makeNamesList() {
    if (this.stations) {
      this.namesList = this.stations.map(station => {
        return station.name
          .toLowerCase()
          .replace(/-/g, '')
          .replace(/\d/g, '')
      })
    }
    return null
  }

  // Stations' name filter
  updateNamesList(e: string) {
    if (e.length < this.oldSearch.length) {
      this.filteredNames = this.namesList.filter(name => name.includes(e.toLowerCase()))
    }
    this.filteredNames = this.filteredNames.length > 0 ?
      this.filteredNames.filter(name => name.includes(e.toLowerCase())) :
      this.namesList.filter(name => name.includes(e.toLowerCase()))
    this.oldSearch = e
  }

  // Stations' search result
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

    console.log('Result:', result);

    if (result.length < 1) {
      this.alertResult(true)
    } else {
      this.zoomResult(result[0])
    }
  }

  // No result alert
  alertResult(val: boolean) {
    this.error.nativeElement.style.opacity = val ? '1' : '0'
    this.input.nativeElement.style.border = val ? '1px solid red' : '1px solid black'
  }


  // MAP actions //
  // Map filter choice with radio btns
  changeType(e: MatRadioChange) {
    console.log('Map Type filter:', e.value)
    this.mapTypeService.setMapType(e.value)
  }

  // Map zoom to target station
  zoomResult(targetStation: Station) {
    this.alertResult(false)
    const markerTarget = this.stationService.markerLayers.filter((marker: L.CircleMarker) => marker.getLatLng().lat === targetStation.lat && marker.getLatLng().lng === targetStation.lon)
    this.zoom(markerTarget[0])
  }


  constructor(
    private formBuilder: FormBuilder,
    private stationService: StationService,
    private mapTypeService: MapTypeService) { }


    ngOnInit(): void {
    // Init stations' name list
    this.stationService.stations$.subscribe(x => {
      this.stations = x
      this.makeNamesList()
    })
    // Init seacch form
    this.searchForm = this.formBuilder.group({
      radio: ['size'],
      search: ['']
    })
    // Subscribe to search form valueChanges
    this.searchSubscription = this.searchForm.get('search')
      .valueChanges
      .subscribe({
        next: x => {
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
