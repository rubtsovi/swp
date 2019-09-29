import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Planet} from "../../types/planet";
import {ApiService} from "../api.service";

@Injectable({
  providedIn: 'root',

})
export class PlanetResolverService implements Resolve<Planet>{

  constructor(private api: ApiService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Planet> {
    return this.api.getPlanet(route.params.id).pipe(

    );
  }


}
