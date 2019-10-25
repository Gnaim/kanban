import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  flag: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (e.url === '/Login' || e.url === '/Signup' || e.url === '/') {
          this.flag = true;
        } else {
          this.flag = false;
        }
      }
    });
  }
}
