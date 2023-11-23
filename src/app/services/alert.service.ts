import { Injectable } from '@angular/core';
import { Subject, filter } from 'rxjs';
import { Alert, AlertType } from '../components/alert/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';

  onAlert(id = this.defaultId) {
    return this.subject.asObservable().pipe(filter(x => x && x.id === id));
  }

  alert(alert: Alert) {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  success(message: string) {
    const alert : Alert = {
      type: AlertType.Success,
      message
    }
    this.alert(alert);    
    console.log(message);
  }

  constructor() { }
}
