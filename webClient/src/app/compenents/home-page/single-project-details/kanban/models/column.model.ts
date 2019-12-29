import { Card } from 'src/app/entity/card';
import { CardStatus } from 'src/app/services/helpers/CardStatus';

export class Column {

    constructor(public name: string, public tasks: Array<Card>, public status: CardStatus) {
        tasks.sort(this.cardsCompare);

    }

    cardsCompare(a: Card, b: Card): number {
        if (a.creationDate > a.creationDate) return 1;
        if (a.title = b.title) return 0;
        if (a.title < b.title) return -1;

    }

    addCard(card: Card) {
        this.tasks.push(card);
        this.tasks.sort(this.cardsCompare);
    }

    removeCard(card: Card) {
        const index = this.tasks.indexOf(card, 0);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
        this.tasks.sort(this.cardsCompare);

    }

}