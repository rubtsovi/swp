import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute} from "@angular/router";
import {Planet} from "../../types/planet";
import {LoaderSwitchService} from "../loader-switch.service";

@Component({
    selector: 'app-planet-detail',
    templateUrl: './planet-detail.component.html',
    styleUrls: ['./planet-detail.component.scss'],
    providers: [ApiService]
})
export class PlanetDetailComponent implements OnInit {
    private _planet: Planet;

    constructor(private loaderSwitch: LoaderSwitchService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.loaderSwitch.switchLoaderOff();
        this._planet = this.route.snapshot.data.planet;
    }


    get planet(): Planet {
        return this._planet;
    }
}
