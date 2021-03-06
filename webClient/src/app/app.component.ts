import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { MyNotificationsService } from './services/notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  flag: boolean;
  status = 'ONLINE';
  isConnected = true;

  constructor(private router: Router,
              private connectionService:ConnectionService,
              private notification : MyNotificationsService) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (e.url === '/Login' || e.url === '/Signup' || e.url === '/' || e.url.includes('/ResetPassword')) {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
    });

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = "ONLINE";
        this.notification.showSuccess();
      }
      else {
        this.status = "OFFLINE";
        this.notification.showError();
      }
    })
  }
}
