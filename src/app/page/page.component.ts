import { HttpClient } from '@angular/common/http'
import { PagefeedService } from './../services/pagefeed.service'
import { Card } from './../utils/interface/card'
import { Subscription, BehaviorSubject } from 'rxjs'
import { Router, NavigationStart } from '@angular/router'
import { Component, OnInit, Output, ViewChild, OnDestroy } from '@angular/core'

/** Text page component
 *  Data from JSON file 'assets/data/cards.json'
 */
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription
  data = {}

  section: string
  sub: string
  subSections: { link: string, title: string }[]
  pageData = {
    titleSection: '',
    textSection: '',
    cards: []
  }

  constructor(private pageService: PagefeedService, private http: HttpClient) { }

  ngOnInit(): void {
    this.section = this.pageService.section

    // Data subscription
    this.http.get('./assets/data/cards.json').subscribe((res: any) => {
      if (res) {
        this.data = res = res.sections
        
        // Set subSection {link: str, title: str} & initial sub
        this.subSections = Object.keys(res[this.section]).map(s => ({ link: s, title: '' }))
        this.sub = this.subSections[0].link

        // Set data for selected section/sub
        this.pageData.titleSection = res[this.section][this.sub].title
        this.pageData.textSection = res[this.section][this.sub].text
        this.pageData.cards = res[this.section][this.sub].content

        // Pass subSection & sub to service
        this.subSections.map(s => s.title = res[this.section][s.link].title)
        this.pageService.subSections$.next(this.subSections)
        this.pageService.sub$.next(this.sub)
      }
    })

    // Navigation subscription & pageData change
    this.routerSubscription = this.pageService.sub$.subscribe(x => {
      this.sub = x
      if (this.data[this.section]) {
        this.pageData.titleSection = this.data[this.section][this.sub].title
        this.pageData.textSection = this.data[this.section][this.sub].text
        this.pageData.cards = this.data[this.section][this.sub].content
      }
    })
    this.routerSubscription.add(this.pageService.subSections$.subscribe(x => {
      this.subSections = x
    }))
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe()
  }

}
