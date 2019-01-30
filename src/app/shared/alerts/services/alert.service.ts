import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AlertService {
    private subject$ = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    this.keepAfterNavigationChange = false;
                } else {
                    this.subject$.next();
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject$.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject$.next({ type: 'error', text: message });
    }

    warning(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject$.next({ type: 'warning', text: message });
    }

    getMessage(): Observable<any> {
        return this.subject$.asObservable();
    }
}
