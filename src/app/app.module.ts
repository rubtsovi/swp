import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import { PlanetListComponent } from './planet-list/planet-list.component';
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatPaginatorModule} from "@angular/material/paginator";
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import {PlanetResolverService} from "./planet-detail/planet-resolver.service";
import {ApiService} from "./api.service";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    declarations: [
        AppComponent,
        PlanetListComponent,
        PlanetDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatInputModule,
        HttpClientModule,
        MatListModule,
        MatIconModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatPaginatorModule,
        MatCardModule
    ],
    providers: [ApiService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
