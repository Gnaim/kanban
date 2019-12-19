
export class Project {
    name: string;
    priority:string;
    description: string;
    members:string[];



    constructor(name:string,
    priority: string,
    description: string,
    members:string[]) {
        this.name = name;
        this.priority=priority;
        this.description=description;
        this.members=members;
    }

}