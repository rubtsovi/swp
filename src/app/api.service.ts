import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EMPTY, from, Observable, of} from "rxjs";
import {Planet} from "../types/planet";
import {PlanetsResponse} from "../types/planets-response";
import {
    combineAll,
    concatAll, debounceTime,
    delay,
    expand,
    map,
    mergeAll,
    mergeMap,
    skip,
    switchMap,
    take,
    toArray
} from "rxjs/operators";
import {empty} from "rxjs";
import {ajax} from "rxjs/ajax";

@Injectable()
export class ApiService {
    private http: HttpClient;
    private url: string = 'https://swapi.co/api/planets/'

    constructor(http: HttpClient) {
        this.http = http;
    }

    public getPlanets(limit: number, offset: number = 0, search: string | null = null): Observable<Planet[]> {
        let url = (search !== null && typeof search === 'string') ?
            this.url + `?search=${search}`:
            this.url;
        return this.http.get(url).pipe(
            debounceTime(search !== null ? 500 : 0),
            expand((res: PlanetsResponse) => {
                if (res.next === null) {
                  return EMPTY;
                }
                return this.http.get(res.next)
            }),
            mergeMap((res: PlanetsResponse): Planet[] => {
                return res.results;
            }),
            skip(offset),
            take(limit),
            toArray()
        );
    }

    public getPlanetsCount(): Observable<number> {
        return this.http.get(this.url).pipe(
            map((res: PlanetsResponse) => res.count)
        )
    }

    public getPlanet(id: number): Observable<Planet> {
        return this.http.get<Planet>(`${this.url + id}/`).pipe(
            map((planet: Planet) => {
                const residentsUrls = planet.residents;
                planet.residents = [];
                residentsUrls.forEach((residentUrl: string) => {
                    this.getResident(residentUrl).subscribe((resident: any) => {
                        planet.residents.push(resident.name);
                    })
                })
                return planet;
            })
        )
    }

    public getResident(url: string): Observable<string> {
        return this.http.get<any>(url);
    }

}
