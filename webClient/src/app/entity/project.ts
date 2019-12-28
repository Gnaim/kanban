import { User } from './user';
import { Card } from './card';

export class Project {
    id:number;
    name: string;   
    description: string;
    creationDate : number; //milliseconds 
	updateDate : number; //milliseconds 
    members: User[];
    cards : Card[];

    constructor(name:string,description: string,id?:number,creationDate?: number,updateDate?: number,members?:User[],cards?: Card[]) {
        if(typeof name === "undefined" ||name === null){
            this.name = "";
        }else {
            this.name = name;
       }
       if(typeof description === "undefined" ||description === null){
            this.description = "";
        }else {
            this.description=description;
        }
        if(typeof id === "undefined" ||id === null){
            this.id = null;
        }else {
            this.id=id;
        }
        if(typeof creationDate === "undefined" ||creationDate === null){
            this.creationDate = null;
        }else {
            this.creationDate=creationDate;
        }
        if(typeof updateDate === "undefined" ||updateDate === null){
            this.updateDate = null;
        }else {
            this.updateDate=updateDate;
        }
        if(typeof members === "undefined" ||members === null){
            this.members = null;
        }else {
            this.members=members;
        }
        if(typeof cards === "undefined" ||cards === null){
            this.cards = null;
        }else {
            this.cards=cards;
        }
    }
}