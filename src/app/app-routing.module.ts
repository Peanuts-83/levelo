import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { LegendComponent } from './map/legend/legend.component';
import { MapComponent } from './map/map.component'

const routes: Routes = [
  {path: '', component: MapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
