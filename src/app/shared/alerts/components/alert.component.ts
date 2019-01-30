  // tslint:disable:component-selector
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: [ './alert.component.scss']
})

export class AlertComponent implements OnInit {
    message: any;
    displayAlert = false;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => {
            this.displayAlert = true;
            this.message = message;
            setTimeout(() => {
                this.dismissAlert();
            }, 6000);
        });
    }

    dismissAlert() {
        this.displayAlert = false;
    }
}
