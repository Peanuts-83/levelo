import { MaterialModule } from './utils/modules/material/material.module'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StationService } from './services/station.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { LegendComponent } from './map/legend/legend.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PubComponent } from './header/pub/pub.component';
import { CardComponent } from './page/card/card.component';
import { PageComponent } from './page/page.component';
import { SubnavComponent } from './page/subnav/subnav.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LegendComponent,
    HeaderComponent,
    FooterComponent,
    PubComponent,
    CardComponent,
    PageComponent,
    SubnavComponent,
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
