import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router'
import { Subscription } from 'rxjs'
import { CardfeedService } from '../services/cardfeed.service'
import { Card } from '../utils/interface/card'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  private subscription: Subscription
  private path: string
  private subpath: string
  title: string
  text: string
  cards: Card[] | []

  constructor(
    private cardfeed: CardfeedService,
    private router: Router) {
    // router.events.subscribe((e: NavigationStart) => {
    //   if (e instanceof NavigationStart) {
    //     console.log('ROUTER EVENT', this.path, this.subpath)
    //     [this.path, this.subpath] = e.url.split('/').slice(1)
    //   }
    // })
  }

  ngOnInit(): void {
    [this.path, this.subpath] = this.router.url.split('/').slice(1)
    console.log('PATH', this.path, 'SUBPATH', this.subpath)
    this.subscription = this.cardfeed.getData().subscribe({
      next: (res: any) => {
        this.title = res ? res[this.path][this.subpath].title : ''
        this.text = res ? res[this.path][this.subpath].text : ''
        this.cards = res ? res[this.path][this.subpath].content : []
        console.log('RES', res? res[this.path][this.subpath] : null);
        const state = {titleSection: this.title, textSection: this.text, cards: this.cards}
        this.cardfeed.setValues(state)
      }
    })
  }
}
