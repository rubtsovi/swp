import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderSwitchService {
    private _loaderState$: BehaviorSubject<boolean>;
    private _loaderState: boolean;

    constructor() {
      this._loaderState$ = new BehaviorSubject<boolean>(this._loaderState);
      this._loaderState$.next(true);
    }

    public switchLoaderOff(): void {
      this._loaderState$.next(false);
    }

    public switchLoaderOn(): void {
      this._loaderState$.next(true);
    }

    public getLoaderState(): Observable<boolean> {
      return this._loaderState$;
    }
}
