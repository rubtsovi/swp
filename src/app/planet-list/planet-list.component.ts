import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Planet} from "../../types/planet";
import {ApiService} from "../api.service";
import {LoaderSwitchService} from "../loader-switch.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {fromEvent, Subscription, timer} from "rxjs";
import {MatInput} from "@angular/material/input";
import {debounceTime, map} from "rxjs/operators";

@Component({
    selector: 'app-planet-list',
    templateUrl: './planet-list.component.html',
    styleUrls: ['./planet-list.component.scss'],
    providers: [ApiService]
})
export class PlanetListComponent implements OnInit, OnDestroy, AfterViewInit {
    private planets: Planet[];
    private planetsSubscription: Subscription;
    private planetsCount: number;
    private planetsCountSubscription: Subscription;
    @ViewChild(MatPaginator, {static: false}) pagePaginator: MatPaginator;
    @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

    constructor(private api: ApiService,
                private loaderSwitch: LoaderSwitchService
    ) {
    }

    ngOnInit() {
        this.getPlanets(10);
        this.api.getPlanetsCount().subscribe((count: number) => {
            this.planetsCount = count;
        })
    }

    ngOnDestroy(): void {
        // this.planetsSubscription.unsubscribe();
        // this.planetsCountSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
            debounceTime(500),
            map((typeEvent: Event) => {
                return (<HTMLInputElement>typeEvent.target).value
            })
        ).subscribe((search) => {
            this.loaderSwitch.switchLoaderOn();
            this.getPlanets(this.pagePaginator.pageSize,
                this.pagePaginator.pageIndex * this.pagePaginator.pageSize,
                search);
        })
    }

    public paginator(event: PageEvent): void {
        this.getPlanets(event.pageSize, event.pageIndex * event.pageSize);
    }

    private getPlanets(limit: number, offset: number = 0, search: string | null = null): void {
        this.loaderSwitch.switchLoaderOn();
        this.planetsSubscription = this.api.getPlanets(limit, offset, search).subscribe((res: Planet[]) => {
            this.planets = res;
            this.loaderSwitch.switchLoaderOff();
        });
    }

    public getPlanetId(url: string): number {

        const urlAsArray = url.split('/');
        return +urlAsArray[urlAsArray.length - 2];
    }

}
