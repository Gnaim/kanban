
export class Project {
    title: string;
    priority:number;
    description: string;
    members:string[];



    constructor(title:string,
    priority: number,
    description: string,
    members:string[]) {
        this.title = title;
        this.priority=priority;
        this.description=description;
        this.members=members;
    }

}