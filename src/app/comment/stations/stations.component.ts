import { ActivatedRoute, Router } from '@angular/router'
import { Card } from './../../utils/interface/card'
import { Component, Input, OnInit } from '@angular/core'
import { CardfeedService } from 'src/app/services/cardfeed.service'

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {
  titleSection: string
  textSection: string
  cards: Card[]

  constructor(private cardfeed: CardfeedService) {
  }

  ngOnInit(): void {
    this.titleSection = this.cardfeed.titleSection
    this.textSection = this.cardfeed.textSection
    this.cards = this.cardfeed.cards
  }
}
