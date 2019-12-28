import { User } from './user';

export class Card {
    id : number;
    title: string;
    type: string; // ajouter un type type
    status: string; // ajouter un type statut
    description: string;
    creationDate : number; //milliseconds 
	updateDate : number; //milliseconds 
    members: User[];

    constructor(title: string,type: string,status: string,
        description: string,creationDate : number,updateDate : number,
        members: User[]) {
        this.type = type;
        this.title = title;
        this.status = status;
        this.description = description;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.members = members;
    }

}