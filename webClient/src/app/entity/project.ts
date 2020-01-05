import { User } from './user';
import { Card } from './card';

export class Project {
    _id:string;
    name: string;   
    description: string;
    createdAt : number; //milliseconds 
	updatedAt : number; //milliseconds 
    members: User[];
    cards : Card[];

    constructor(name:string,description: string,members?:User[],_id?:string,createdAt?: number,updatedAt?: number,cards?: Card[]) {
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
        if(typeof _id === "undefined" ||_id === null){
            this._id = null;
        }else {
            this._id=_id;
        }
        if(typeof createdAt === "undefined" ||createdAt === null){
            this.createdAt = null;
        }else {
            this.createdAt=createdAt;
        }
        if(typeof updatedAt === "undefined" ||updatedAt === null){
            this.updatedAt = null;
        }else {
            this.updatedAt=updatedAt;
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