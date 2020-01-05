import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/entity/card';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.scss']
})
export class TaskOverviewComponent implements OnInit {
  @Input('card') card: Card;
  
  constructor() { }

  ngOnInit() {
  }

}
