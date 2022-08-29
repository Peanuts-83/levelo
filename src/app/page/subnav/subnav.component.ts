import { PagefeedService } from './../../services/pagefeed.service'
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss']
})
export class SubnavComponent implements OnInit {
  data: any = {}

  constructor(private pageService: PagefeedService) { }

  ngOnInit(): void {
    this.pageService.pageData$.subscribe(res => {
      if (res) {
        this.data.titleSection = res.titleSection
        this.data.textSection = res.textSection
        this.data.cards = res.cards
        console.log(this.data.titleSection, this.data.textSection, this.data.cards)

      }
    })
  }

}
