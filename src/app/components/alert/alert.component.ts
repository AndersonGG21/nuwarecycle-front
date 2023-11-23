import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';

  alerts: Alert[] = [];
  classes: string[] = ['animate-fade-up'];
  alertSubscription: Subscription | undefined;
  private alertService = inject(AlertService);

  ngOnInit(): void {
    this.alertSubscription = this.alertService
      .onAlert(this.id)
      .subscribe((alert) => {
        if (!alert.message) {
          return;
        }
        this.alerts.push(alert);

        setTimeout(() => this.removeAlert(alert), 3000);
      });
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    this.classes.push('animate-fade-down');
    this.classes.push('animate-reverse');
    const timeout = 3000;
    setTimeout(() => {
      //Remove alert from array after fade out
      this.alerts = this.alerts.filter((x) => x !== alert);
      this.classes = this.classes.filter((x) => x !== 'animate-fade-down' && x !== 'animate-reverse');
    }, timeout);    
  }

  cssClass(alert: Alert) {
    const classes = ['animate-fade-up'];

    if (alert.fade) {
      classes.push('');
    }

    return classes.join(' ');
  }

  ngOnDestroy(): void {
    this.alertSubscription?.unsubscribe();
  }
}
