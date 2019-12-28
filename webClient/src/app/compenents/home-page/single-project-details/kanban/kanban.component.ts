import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from './models/board.model';
import { Column } from './models/column.model';
import { Card } from 'src/app/entity/card';
import { CardsService } from 'src/app/services/cardService/cards.service';
import { CardStatus } from 'src/app/services/helpers/CardStatus';

@Component({
    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit {

    backLogColumn: Column;
    inProgressColumn: Column;
    doneColumn: Column;
    constructor(private cardsService: CardsService) {

        this.loadData();


    }
    loadData() {

        const allProjectCards: Array<Card> = this.cardsService.getCardsByProject("ss");

        this.backLogColumn = new Column("BACKLOG", allProjectCards.filter(this.cardStatusPredicate(CardStatus.TODO)));
        this.inProgressColumn = new Column("IN-PROGRESS", allProjectCards.filter(this.cardStatusPredicate(CardStatus.IN_PROGESS)));
        this.doneColumn = new Column("DONE", allProjectCards.filter(this.cardStatusPredicate(CardStatus.DONE)));


    }


    cardStatusPredicate(status: CardStatus) {
        return (a: Card) => a.status == status;

    }
    board: Board = new Board('Project Board', [this.backLogColumn, this.inProgressColumn, this.doneColumn]);

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
