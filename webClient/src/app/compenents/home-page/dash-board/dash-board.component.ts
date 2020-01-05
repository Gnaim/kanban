import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dahsboardService/dashboard.service';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { HttpHelpers } from 'src/app/services/helpers/httpHelpers';
import { Project } from 'src/app/entity/Project';
import { Card } from 'src/app/entity/card';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  projects : Project[];
  cards : Card[];

  constructor(private dashboardService:DashboardService,private notification : MyNotificationsService) { }

  ngOnInit() {
    this.getMyDashboard();
  }

  getMyDashboard() {
    this.dashboardService.getDashboard().subscribe(
      (dashboard) => {
          let jsonResponse = HttpHelpers.parseData(dashboard.body);
          this.projects =  jsonResponse.projects as Project[];
          this.cards =  jsonResponse.cards as Card[];
      },(error) => {
        console.log(error);
        this.notification.showErrorNotification(error);
      })
  }
}