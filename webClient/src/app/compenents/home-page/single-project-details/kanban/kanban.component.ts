import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from './models/board.model';
import { Column } from './models/column.model';

@Component({
    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit {

    constructor() { }

    board: Board = new Board('Test Board', [
        // new Column('BACKLOG', [
        //     "Some random idea",
        //     "This is another random idea",
        //     "build an awesome application"
        // ]),
        // new Column('IN-PROGRESS', [
        //     "Lorem ipsum",
        //     "foo",
        //     "This was in the 'Research' column"
        // ]),
        // new Column('DONE', [
        //     'Get to work',
        //     'Pick up groceries',
        //     'Go home',
        //     'Fall asleep'
        // ])

    ]);

    ngOnInit() {
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
            this.updateTask(event.previousContainer, event.container, event.previousContainer.data);
        }
    }


    updateTask(previousContainer, container, data) {
        // case backlog to inProgress

        //case in progress backlog 

        //case backlog finish 

        // case finish backlog 

        // case in progress to finish 

        // case finish to in progress


    }


}
