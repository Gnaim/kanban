import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from './models/board.model';
import { Column } from './models/column.model';
import { Card } from 'src/app/entity/card';
import { CardsService } from 'src/app/services/cardService/cards.service';
import { CardStatus } from 'src/app/services/helpers/CardStatus';
import { MyNotificationsService } from 'src/app/services/notifications/notifications.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TaskFormComponent } from '../../task-form/task-form.component';
import { Project } from 'src/app/entity/Project';


@Component({
    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.scss'],
})
export class KanbanComponent implements OnInit,OnChanges {

    @Input('project') project : Project;
    @Input('members') projectMembers = [];
    @Input('cards') cards : Card[];
    @Output('notifyOnChange') notifyOnChange = new EventEmitter(); 
    backLogColumn: Column;
    inProgressColumn: Column; //Doing
    doneColumn: Column;
    board: Board;
    bsModalRef: BsModalRef;
    
    constructor(private cardService: CardsService,
                private notification : MyNotificationsService,
                private modalService: BsModalService) {}

    ngOnInit() {
        console.log(this.project);
        console.log(this.projectMembers);
       this.loadData();
    }

    ngOnChanges() {
        this.loadData();
    }

    loadData(){
        this.backLogColumn = new Column("BACKLOG", this.cards.filter((a: Card, index: number, array: Card[]) => { return (a.status == CardStatus.TODO || a.status == CardStatus.TODO_U); }), CardStatus.TODO);
        this.inProgressColumn = new Column("IN-PROGRESS", this.cards.filter((a: Card, index: number, array: Card[]) => { return (a.status == CardStatus.IN_PROGESS || a.status == CardStatus.IN_PROGESS_U); }), CardStatus.IN_PROGESS);
        this.doneColumn = new Column("DONE", this.cards.filter((a: Card, index: number, array: Card[]) => { return (a.status == CardStatus.DONE || a.status == CardStatus.DONE_U); }), CardStatus.DONE);
        this.board = new Board('Project Board', [this.backLogColumn, this.inProgressColumn, this.doneColumn]);
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
            this.updateTaskStauts(event.item.data, status);
        }
    }

    updateTaskStauts(card: Card, status: CardStatus) {
        console.log("drop event:" + card.status + " ==> " + status);
        if(status == CardStatus.TODO)  card.status = CardStatus.TODO_U;
        if(status == CardStatus.IN_PROGESS)  card.status = CardStatus.IN_PROGESS_U;
        if(status == CardStatus.DONE)  card.status = CardStatus.DONE_U;

        this.cardService.updateCard(card,this.project._id).subscribe(
        (response) => {
            console.log(response);
            this.notification.showSuccess();
        },(error) => {
            this.notifyOnChange.emit("UPDATED");
            this.notification.showErrorNotification(error);
        });
    }

    showTask(card:Card){
        this.openTaskDetail(card);
    }

    openTaskDetail(selectedCard:Card) {
        const initialState = {
            projectName : this.project.name,
            projectId : this.project._id,
            projectMembers : this.projectMembers,
            card : selectedCard,
            isConsult : true
        }
        this.bsModalRef = this.modalService.show(TaskFormComponent,{initialState,class: 'modal-lg'});
        this.bsModalRef.content.closeBtnName = 'Close';
        this.modalService.onHidden.subscribe((reason:string) => {
            if(reason != "backdrop-click"){ 
                this.notifyOnChange.emit("UPDATED");
          }
        })
      }
    
}
