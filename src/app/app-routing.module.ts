import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { LegendComponent } from './map/legend/legend.component';
import { MapComponent } from './map/map.component'
import { CommentComponent } from './comment/comment.component'
import { MagazineComponent } from './magazine/magazine.component'
import { SecuriteComponent } from './securite/securite.component'
import { TicketsComponent } from './tickets/tickets.component'

const routes: Routes = [
  {path: '', component: MapComponent},
  {path: 'comment_ça_marche', component: CommentComponent},
  {path: 'tickets', component: TicketsComponent},
  {path: 'magazine', component: MagazineComponent},
  {path: 'securite', component: SecuriteComponent},
  {path: '**', component: MapComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
