import { BehaviorSubject, Subscription } from 'rxjs'
import { PagefeedService } from './../../services/pagefeed.service'
import { Component, Input, OnInit, ViewChild, AfterViewInit, ElementRef, OnDestroy, ViewChildren, QueryList } from '@angular/core'

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss']
})
export class SubnavComponent implements OnInit, OnDestroy {
  routerSubscription: Subscription
  section: string
  sub: string
  subSections: { link: string, title: string }[]

  // subSection links in DOM
  @ViewChildren('nav') nav: QueryList<any>

  // Active subSection btn CSS
  setSub(sub: string, e: MouseEvent) {
    const li = this.nav.toArray()
    li.forEach((el) => {
      el.nativeElement.className = ''
    })
    let target = (e.target as HTMLLIElement)
    target.classList.add('active')
    this.pageService.sub$.next(sub)
  }

  constructor(private pageService: PagefeedService) { }

  ngOnInit(): void {
    this.section = this.pageService.section
    this.routerSubscription = this.pageService.sub$.subscribe({
      next: x => {
        if (!x) return
        this.sub = x
      }
    })
    this.routerSubscription.add(
      this.pageService.subSections$.subscribe(res => {
        if (!res) return
        this.subSections = res
        this.sub = this.subSections[0].link
        if (!this.sub) {
        }
        // console.log('SECTION', this.section, this.sub, this.subSections)
      })
    )
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe()
  }
}
