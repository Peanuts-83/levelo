import { HttpClient } from '@angular/common/http'
import { PagefeedService } from './../services/pagefeed.service'
import { Card } from './../utils/interface/card'
import { Subscription } from 'rxjs'
import { Router, NavigationStart } from '@angular/router'
import { Component, OnInit, Output, ViewChild, OnDestroy } from '@angular/core'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription
  dataSubscription: Subscription

  section: string
  sub: string
  subSections = []
  data = {
    titleSection: '',
    textSection: '',
    cards: []
  }

  constructor(private pageService: PagefeedService, private http: HttpClient) { }

  ngOnInit(): void {
    this.section = this.pageService.section
    console.log('Section', this.section)
    this.dataSubscription = this.http.get('../../assets/data/cards.json').subscribe((res: any) => {
      if (res) {
        res = res.sections
        this.pageService.subSections = this.subSections = Object.keys(res[this.section])
        this.pageService.sub = this.sub = this.subSections[0]
        console.log('DATA from service', res, this.subSections, this.sub)
        this.data.titleSection = res[this.section][this.sub].title
        this.data.textSection = res[this.section][this.sub].text
        this.data.cards = res[this.section][this.sub].content
        this.pageService.pageData$.next({
          titleSection: this.data.titleSection,
          textSection: this.data.textSection,
          cards: this.data.cards
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe()
  }

}
