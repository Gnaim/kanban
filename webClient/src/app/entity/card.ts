import { User } from './user';
import { CardStatus } from '../services/helpers/CardStatus';

export class Card {
    id: number;
    title: string;
    type: string; // ajouter un type type
    status: CardStatus; // ajouter un type statut
    description: string;
    creationDate: number; //milliseconds 
    updateDate: number; //milliseconds 
    members: User[];


    constructor(title?: string, type?: string, status?: CardStatus,
        description?: string, creationDate?: number, updateDate?: number,
        members?: User[]) {
        console.log(title);
        this.type = type;
        this.title = title;
        console.log(this.title);
        this.status = status;
        this.description = description;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.members = members;
    }



}