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


  getCardsByProject(projectId: string){
    return this.http.get(HttpHelpers.PROJECTS_URL + "/" + projectId + "/" + HttpHelpers.CARDS_URL,{observe: "response"});
  }

  updateCard(card: Card,projectId:string) {
    return this.http.put(HttpHelpers.PROJECTS_URL + "/" + projectId + "/" + HttpHelpers.CARDS_URL + "/"  + card._id,card,HttpHelpers.HTTP_OPTIONS);
  }

  deleteCard(cardId:string,projectId:string){
    return this.http.delete(HttpHelpers.PROJECTS_URL + "/" + projectId + "/" + HttpHelpers.CARDS_URL + "/"  + cardId,HttpHelpers.HTTP_OPTIONS);
  }
}
