import {Component, OnInit} from '@angular/core';
import {LoaderSwitchService} from "./loader-switch.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from "@angular/router";

@Component({
    selector: 'app-root',
    template: `
        <div id="loader" class="d-flex w-100 h-100 position-fixed justify-content-center align-items-center"
             *ngIf="loaderState">
            <mat-progress-spinner mode="indeterminate" diameter="50"></mat-progress-spinner>
        </div>
        <router-outlet></router-outlet>
    `,
    styles: [],
    providers: [LoaderSwitchService]
})
export class AppComponent {
    private _loaderState: boolean = true;
    constructor(private router: Router,
                private loaderSwitch: LoaderSwitchService
    ) {
        router.events.subscribe((event: RouterEvent) => {
            this.toggleLoader(event);
        });
        loaderSwitch.getLoaderState().subscribe((loaderState) => {
            this._loaderState = loaderState;
        });
    }

    public toggleLoader(routerEvent: RouterEvent): void {
        if (routerEvent instanceof NavigationStart) {
            this._loaderState = true;
        } else if (
            routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError
        ) {
            this._loaderState = false;
        }
    }


    public get loaderState(): boolean {
        return this._loaderState;
    }
}
