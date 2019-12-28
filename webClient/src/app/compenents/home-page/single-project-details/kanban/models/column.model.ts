import { Card } from 'src/app/entity/card';

export class Column {
    sortedTasks: Card[];
    constructor(public name: string, public tasks: Card[]) {
        tasks.sort((a: Card, b: Card) => {
            if (a.title > b.title) return 1;
            if (a.title = b.title) return 0;
            if (a.title < b.title) return -1;
        });

    }
}