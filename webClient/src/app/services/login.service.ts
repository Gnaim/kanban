import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  //connect(,){

  
  connect(email:String,password:String){
    // TODO: post request 
    this.setToken();
    this.http.get('https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port').subscribe(()=>{
     
    });

;    
  
return true;

  }

    public getToken(): string {
      return localStorage.getItem('token');
    }
public setToken(){
localStorage.setItem('token',"EJFHBANLWKGJBVFNSHBIGUFDT");
}
  
}
