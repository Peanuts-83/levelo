import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { LegendComponent } from './map/legend/legend.component';
import { MapComponent } from './map/map.component'
import { PageComponent } from './page/page.component'

const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'comment_ca_marche', component: PageComponent},
  {path: 'tickets', component: PageComponent},
  {path: 'magazine', component: PageComponent},
  {path: 'securite', component: PageComponent},
  {path: '**', redirectTo: 'map'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
