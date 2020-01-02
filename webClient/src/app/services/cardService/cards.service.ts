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

  createCard(card:Card,projectId:string) {
    return this.http.post(HttpHelpers.PROJECTS_URL + "/" + projectId + "/" + HttpHelpers.CARDS_URL,card,{observe: "response"});
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
