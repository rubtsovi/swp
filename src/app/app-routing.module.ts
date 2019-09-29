import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlanetListComponent} from "./planet-list/planet-list.component";
import {PlanetDetailComponent} from "./planet-detail/planet-detail.component";
import {PlanetResolverService} from "./planet-detail/planet-resolver.service";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/planets',
    pathMatch: 'full'
  },
  {
    path: 'planets',
    component: PlanetListComponent,
    pathMatch: 'full'
  },
  {
    path: 'planets/:id',
    component: PlanetDetailComponent,
    pathMatch: 'full',
    resolve: {planet: PlanetResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule],
  providers: [PlanetResolverService]
})
export class AppRoutingModule { }
