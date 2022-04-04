import { Injectable } from "@angular/core";
import { CanLoad, Route, Router } from "@angular/router";
import { Observable } from "rxjs";

import { Observable as WindowedObservable } from 'windowed-observable';

const WrapperService$ = new WindowedObservable('WrapperService');

declare let myService: any;
@Injectable()
export class AuthGuard implements CanLoad {
    private serviceReady$: Observable<boolean>;
    private serviceReady: boolean;
    constructor(private router: Router) {
        console.log("AuthGuard | CTOR")
        this.serviceReady = false;
        this.serviceReady$ = new Observable<boolean>(subscriber => {
            if (typeof myService === 'undefined') {
                console.log("AuthGuard | CTOR | serviceReady | myService is truthy");
                this.serviceReady = true;
                subscriber.next(true);
            }
            console.log("AuthGuard | CTOR | serviceReady new  Observable")
            WrapperService$.subscribe((message: string) => {
                if (message == "loaded myService")
                    console.log("AuthGuard | CTOR | serviceReady | WrapperService$ | loaded myService");
                this.serviceReady = true;
                subscriber.next(true);
            });
        });
    }

    //NOTE: canLoad will check all the values returned and wait until all observables complete.
    // CanLoad protects a module to be loaded but once module is loaded then CanLoad guard will do nothing
    // But when user is logged-out, still user will be able to navigate those children paths because module is already loaded.

    canLoad(): Observable<boolean> | boolean {
        console.log("AuthGuard | canLoad")
        return this.serviceReady || this.serviceReady$;
    }

    canActivate(): Observable<boolean> | boolean {
        console.log("AuthGuard | canActivate")
        return  this.serviceReady || this.serviceReady$;
    }
}