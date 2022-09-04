import { Component, Input, OnInit } from '@angular/core'

/**
 * Card component
 * For right part of page component
 */
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() card: any
  constructor() { }

  ngOnInit(): void {
  }

}