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
    board: Board;
    constructor(private cardsService: CardsService) {
        let allProjectCards: Array<Card> = new Array();

        allProjectCards.push(new Card("titlgge1", "dev", CardStatus.TODO, "teeest", 121212, 121212));
        allProjectCards.push(new Card("20", "dev", CardStatus.TODO, "create a test for the added feature", 121212, 121212));
        allProjectCards.push(new Card("kjlgdhlsa", "bug", CardStatus.TODO, "create a feature", 121212, 121212));
        allProjectCards.push(new Card("titlgge1", "dev", CardStatus.IN_PROGESS, "create a test for the added feature", 121212, 121212));
        allProjectCards.push(new Card("title2", "bug", CardStatus.TODO, "create a test for the added feature", 121212, 121212));
        allProjectCards.push(new Card("title3", "dev", CardStatus.IN_PROGESS, "create a test for the added feature", 121212, 121212));
        allProjectCards.push(new Card("tite1", "bug", CardStatus.DONE, "create a test for the added feature", 121212, 121212));
        allProjectCards.push(new Card("titlgge2", "bug", CardStatus.TODO, "create a test for the added feature", 121212, 121212));
        allProjectCards.push(new Card("titlgge4", "dev", CardStatus.DONE, "create a test for the added feature", 121212, 121212));
        // console.log(allProjectCards);
        this.backLogColumn = new Column("BACKLOG", allProjectCards.filter((a: Card, index: number, array: Card[]) => { return a.status == CardStatus.TODO; }), CardStatus.TODO);
        this.inProgressColumn = new Column("IN-PROGRESS", allProjectCards.filter((a: Card, index: number, array: Card[]) => { return a.status == CardStatus.IN_PROGESS; }), CardStatus.IN_PROGESS);
        this.doneColumn = new Column("DONE", allProjectCards.filter((a: Card, index: number, array: Card[]) => { return a.status == CardStatus.DONE; }), CardStatus.DONE);

        // console.log(this.backLogColumn.tasks);
        this.board = new Board('Project Board', [this.backLogColumn, this.inProgressColumn, this.doneColumn]);
    }
    loadData() {

        // let allProjectCards: Array<Card> = this.cardsService.getCardsByProject("ss");


    }



    ngOnInit() {

    }

    drop(event: CdkDragDrop<Column>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data.tasks, event.previousIndex, event.currentIndex);
        } else {
            let status: CardStatus = event.container.data.status;
            transferArrayItem(event.previousContainer.data.tasks,
                event.container.data.tasks,
                event.previousIndex,
                event.currentIndex);
            this.updateTask(event.item.data, status);
        }
    }


    updateTask(card: Card, status: CardStatus) {

        console.log(" drop event:" + card.status + " ==> " + status);
        card.status = status;
        this.cardsService.updateCard(card);


    }


}
