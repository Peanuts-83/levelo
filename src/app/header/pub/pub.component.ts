import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core'

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.scss']
})
export class PubComponent implements AfterViewInit {
  @ViewChild('pub1') pub1: ElementRef<HTMLImageElement>
  @ViewChild('pub2') pub2: ElementRef<HTMLImageElement>
  @ViewChild('pub3') pub3: ElementRef<HTMLImageElement>
  @ViewChild('pub4') pub4: ElementRef<HTMLImageElement>
  @ViewChild('pub5') pub5: ElementRef<HTMLImageElement>
  private pubs: ElementRef[]

  constructor() { }

  ngAfterViewInit() {
    this.pubs = [this.pub1, this.pub2, this.pub3, this.pub4, this.pub5]
    let count = 0
    setInterval(() => {
      this.pubs[count].nativeElement.style.display = 'block'
      setTimeout(() => this.pubs[count].nativeElement.style.opacity = 1, 200)
      setTimeout(() => this.pubs[count].nativeElement.style.opacity = 0, 6500)
      setTimeout(() => this.pubs[count].nativeElement.style.diplay = 'none', 6900)
      count++
      if (count > 4) {
        count = 0
      }
    }, 7000)
  }

}
