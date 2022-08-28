import { AbonnementComponent } from './tickets/abonnement/abonnement.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// import { LegendComponent } from './map/legend/legend.component';
import { MapComponent } from './map/map.component'
import { CommentComponent } from './comment/comment.component'
import { MagazineComponent } from './magazine/magazine.component'
import { SecuriteComponent } from './securite/securite.component'
import { TicketsComponent } from './tickets/tickets.component'
import { StationsComponent } from './comment/stations/stations.component'
import { VelosComponent } from './comment/velos/velos.component'
import { UtiliserComponent } from './comment/utiliser/utiliser.component'
import { FaqComponent } from './comment/faq/faq.component'
import { ProComponent } from './tickets/pro/pro.component'
import { TarifsComponent } from './tickets/tarifs/tarifs.component'
import { TicketComponent } from './tickets/ticket/ticket.component'

const routes: Routes = [
  { // Comment ça marche + sub-menu
    path: 'comment_ca_marche', component: CommentComponent, children: [
      { path: 'stations', component: StationsComponent },
      { path: 'velos', component: VelosComponent },
      { path: 'utiliser', component: UtiliserComponent },
      { path: 'faq', component: FaqComponent },
      { path: '**', redirectTo: 'stations' },
    ]
  },
  { // Abonnement & Tickets + sub-menu
    path: 'tickets', component: TicketsComponent, children: [
      { path: 'abonnement', component: AbonnementComponent },
      { path: 'ticket', component: TicketComponent },
      { path: 'tarifs', component: TarifsComponent },
      { path: 'pro', component: ProComponent },
      { path: '**', redirectTo: 'abonnement' },
    ]
  },
  { path: 'map', component: MapComponent },
  { path: 'magazine', component: MagazineComponent },
  { path: 'securite', component: SecuriteComponent },
  { path: '**', redirectTo: 'map' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
