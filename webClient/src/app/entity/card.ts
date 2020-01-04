import { User } from './user';
import { CardStatus } from '../services/helpers/CardStatus';

export class Card {
    _id: string;
    title: string;
    type: string; // ajouter un type type
    status: CardStatus; // ajouter un type statut
    description: string;
    checklist : string[];
    createdBy : string;
    createdAt: number; //milliseconds 
    updatedAt: number; //milliseconds 
    members: User[];


    constructor(title?: string, type?: string, status?: CardStatus,
        description?: string, creationDate?: number, updateDate?: number,
        members?: User[],_id?:string) {
        this.type = type;
        this.title = title;
        this.status = status;
        this.description = description;
        this.createdAt = creationDate;
        this.updatedAt = updateDate;
        this.members = members;
        this._id = _id;
    }



}