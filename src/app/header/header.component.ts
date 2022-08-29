import { PagefeedService } from './../services/pagefeed.service'
import { fromEvent, Observable, Subscription } from 'rxjs'
import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy, EventEmitter } from '@angular/core'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('menu') menu: ElementRef
  innerWidth: number = 768
  private resizeObservable$: Observable<Event>
  private resizeSubscription$: Subscription

  setPath(path: string) {
    console.log('Section', path)
    this.page.section = path
  }
  // Resize listener
  onResize(event) {
    this.innerWidth = event.target.innerWidth
    if (this.innerWidth >= 768) {
      // console.log('SHOW')
      this.menu.nativeElement.style.display = 'flex'
      this.menu.nativeElement.style.opacity = 1
    } else {
      // console.log('HIDE')
      this.menu.nativeElement.style.display = 'none'
    }
    console.log(this.innerWidth)
  }

  // Show/Hide menu
  displayMenu(show: boolean) {
    // console.log('display()')
    if (this.innerWidth >= 768) return
    if (show) {
      this.menu.nativeElement.style.display = 'flex'
      setTimeout(() => {
        this.menu.nativeElement.style.opacity = 1
        this.menu.nativeElement.style.transform = 'translateY(0)'
      }, 50)
    } else {
      this.menu.nativeElement.style.opacity = 0
      this.menu.nativeElement.style.transform = 'translateY(10px)'
      setTimeout(() => {
        this.menu.nativeElement.style.display = 'none'
      }, 300)
    }
  }

  constructor(private page: PagefeedService) { }

  ngOnInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize')
    this.resizeSubscription$ = this.resizeObservable$.subscribe(e => {
      this.onResize(e)
    })
  }

  ngOnDestroy(): void {
    this.resizeSubscription$.unsubscribe()
  }

}
