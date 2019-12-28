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

        this.backLogColumn = new Column("BACKLOG", allProjectCards.filter((a: Card, index: number, array: Card[]) => { a.status == CardStatus.TODO }));
        this.inProgressColumn = new Column("IN-PROGRESS", allProjectCards.filter((a: Card, index: number, array: Card[]) => { a.status == CardStatus.IN_PROGESS }));
        this.doneColumn = new Column("DONE", allProjectCards.filter((a: Card, index: number, array: Card[]) => { a.status == CardStatus.DONE }));


    }

    board: Board = new Board('Project Board', [this.backLogColumn, this.inProgressColumn, this.doneColumn]);

    ngOnInit() {
    }

    drop(event: CdkDragDrop<Card[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            let status: CardStatus = event.container.data[0].status;
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
            this.updateTask(event.item.data, status);
        }
    }


    updateTask(card: Card, status: CardStatus) {

        card.status = status;
        this.cardsService.updateCard(card);


    }


}
