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
  section: string
  sub$ = new BehaviorSubject(null)
  subSections$ = new BehaviorSubject(null)

  constructor(private http: HttpClient, private router: Router) {
    this.section = window.location.href.split('/')[window.location.href.split('/').length - 1]
  }



}
