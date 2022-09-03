import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

/**
 * Regular page builder from JSON (except Map page)
 * Navigation manager with section & subsections
 */
@Injectable({
  providedIn: 'root'
})
export class PagefeedService {
  data$ = new BehaviorSubject(null)
  pageData$ = new BehaviorSubject(null)
  section: string
  sub$ = new BehaviorSubject(null)
  subSections$ = new BehaviorSubject(null)

  constructor(private http: HttpClient, private router: Router) {
    this.section = window.location.href.split('/')[window.location.href.split('/').length - 1]
  }



}
