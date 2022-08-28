import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Subscription } from 'rxjs'
import { Injectable, OnDestroy } from '@angular/core'
import { CardsData } from '../utils/interface/card'


@Injectable({
  providedIn: 'root'
})
export class CardfeedService implements OnDestroy {
  private data$: BehaviorSubject<CardsData> = new BehaviorSubject(null)
  private subscription$: Subscription
  titleSection
  textSection
  cards

  getData() {
    return this.data$
  }

  setValues(state) {
    this.titleSection = state.titleSection
    this.textSection = state.textSection
    this.cards = state.cards
  }

  constructor(private http: HttpClient) {
    console.log('init cardfeed')
    this.subscription$ = this.http.get('../../assets/data/cards.json').subscribe({
      next: (res: any) => this.data$.next(res.cards)
    })
    console.log('DATA$', this.data$);

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
}
