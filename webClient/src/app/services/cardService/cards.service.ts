import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Card } from '../../entity/card';
import { Observable } from 'rxjs';
import { HttpHelpers } from '../helpers/httpHelpers';
@Injectable({
  providedIn: 'root'
})
export class CardsService {
  fail: boolean = true;
  CARD_ADD_URL = "http://127.0.0.1:3000/cards";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) { }

  createCard(type: string,
    title: string,
    description: string,
    point: number,
    members: string[]): boolean {
    /*
        let response: Observable<any> = this.http.post<Card>(this.CARD_ADD_URL, new Card(type, title, description, point, members), this.httpOptions);
        response.subscribe((response: Object) => {
          console.log(response);
          this.fail = false;
    
        }, (err) => { this.fail = true; });
    */
    return !this.fail;

  }


  getCardsByProject(projectId: string): Array<Card> {

    let response: any;
    // any=HttpHelpers.parseData(this.http.get(HttpHelpers.CARDS_URL, HttpHelpers.HTTP_OPTIONS));
    let tempResponse: string = " ";


    return new Array<Card>();


  }


  updateCard(card: Card) {
    //  this.http.put(HttpHelpers.CARDS_URL, HttpHelpers.HTTP_OPTIONS);
  }
}
