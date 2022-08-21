import { MaterialModule } from './utils/modules/material/material.module'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StationService } from './services/station.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LegendComponent } from './legend/legend.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PubComponent } from './pub/pub.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LegendComponent,
    HeaderComponent,
    FooterComponent,
    PubComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [StationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
