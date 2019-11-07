export class Card {
    type: string;
    title: string;
    description: string;
    point: number;
    members: string[];



    constructor(type: string, title: string,
        description: string,
        point: number,
        members: string[]) {
        this.type = type;
        this.title = title;
        this.description = description;
        this.point = point;
        this.members = members;
    }

}