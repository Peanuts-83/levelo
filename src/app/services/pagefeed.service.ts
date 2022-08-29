import { filter } from 'rxjs/operators'
import { Card } from '../utils/interface/card'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Injectable, OnDestroy, OnInit } from '@angular/core'
import { CardsData } from '../utils/interface/card'
import { NavigationEnd, Router, NavigationStart } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class PagefeedService {
  private subscription: Subscription
  data$ = new BehaviorSubject(null)
  pageData$ = new BehaviorSubject(null)
  section
  sub
  subSections

  constructor(private http: HttpClient, private router: Router) {
    this.section = window.location.href.split('/')[window.location.href.split('/').length - 1]

    // this.subscription = this.http.get('../../assets/data/cards.json').subscribe({
    //   next: (res: any) => {
    //     this.data$.next(res.sections)
    //   }
    // })
  }



}
