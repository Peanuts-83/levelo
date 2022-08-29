import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { LegendComponent } from './map/legend/legend.component';
import { MapComponent } from './map/map.component'
import { PageComponent } from './page/page.component'

const routes: Routes = [
  {path: '', component: MapComponent},
  {path: 'comment_ça_marche', component: PageComponent},
  {path: 'tickets', component: PageComponent},
  {path: 'magazine', component: PageComponent},
  {path: 'securite', component: PageComponent},
  {path: '**', component: MapComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
