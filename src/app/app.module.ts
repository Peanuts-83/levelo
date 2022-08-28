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
import { PubComponent } from './map/pub/pub.component';
import { CommentComponent } from './comment/comment.component';
import { TicketsComponent } from './tickets/tickets.component';
import { MagazineComponent } from './magazine/magazine.component';
import { SecuriteComponent } from './securite/securite.component';
import { StationsComponent } from './comment/stations/stations.component';
import { VelosComponent } from './comment/velos/velos.component';
import { UtiliserComponent } from './comment/utiliser/utiliser.component';
import { FaqComponent } from './comment/faq/faq.component';
import { AbonnementComponent } from './tickets/abonnement/abonnement.component';
import { TicketComponent } from './tickets/ticket/ticket.component';
import { TarifsComponent } from './tickets/tarifs/tarifs.component';
import { ProComponent } from './tickets/pro/pro.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LegendComponent,
    HeaderComponent,
    FooterComponent,
    PubComponent,
    CommentComponent,
    TicketsComponent,
    MagazineComponent,
    SecuriteComponent,
    StationsComponent,
    VelosComponent,
    UtiliserComponent,
    FaqComponent,
    AbonnementComponent,
    TicketComponent,
    TarifsComponent,
    ProComponent,
    CardComponent,
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
