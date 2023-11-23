import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Alert, AlertType } from './alert.model';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy{
  
  @Input() id = 'default-alert';

  alerts : Alert[] = [];
  alertSubscription: Subscription | undefined;
  private alertService = inject(AlertService);


  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert(this.id).subscribe( alert =>{
      if (!alert.message) {
        return;
      }
      this.alerts.push(alert);      
      
      setTimeout(() => this.removeAlert(alert), 2000);
    })
  }

  removeAlert(alert : Alert){
    if (!this.alerts.includes(alert)) 
      return;
    
    const timeOut = 2000;

    setTimeout(() => {
      //Remove alert from array
      this.alerts = this.alerts.filter(x => x !== alert);
    }, timeOut);
  }

  cssClass(alert : Alert){
    if (!alert) return;
    const alertTypeClass = {
      [AlertType.Success] : 'alert alert-success',
      [AlertType.Error] : 'alert alert-danger',
      [AlertType.Info] : 'alert alert-info',
      [AlertType.Warning] : 'alert alert-warning'      
    }
  }

  ngOnDestroy(): void {
    this.alertSubscription?.unsubscribe();
  }





}

