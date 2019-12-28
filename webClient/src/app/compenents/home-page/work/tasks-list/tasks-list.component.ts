import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/entity/card';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  
  @Input('card') card : Card;
  @Input('memberName') memberName : string;
  
  ngOnInit() {
    console.log(this.card);
  }
  
}
