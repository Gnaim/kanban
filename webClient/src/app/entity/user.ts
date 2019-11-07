

export class User {
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    tel:number;
    repeatedPassword:string;
    imageUrl:string;

    constructor(email:string,password:string,firstName?:string,lastName?:string,tel?:number,repeatedPassword?:string,imageUrl?:string) {
            if(typeof email === "undefined" ||email === null){
                this.email = "";
            }else {
                this.email = email;
           }
           if(typeof password === "undefined" ||password === null){
                this.password = "";
            }else {
                this.password = password;
            }
            if(typeof firstName === "undefined" ||firstName === null){
                this.firstName = "";
            }else {
                this.firstName = firstName;
            }
            if(typeof lastName === "undefined" ||lastName === null){
                this.lastName = "";
            }else {
                this.lastName = lastName;
            }
            if(typeof tel === "undefined" ||tel === null){
                this.tel = 0;
            }else {
                this.tel = tel;
            }
            if(typeof repeatedPassword === "undefined" ||repeatedPassword === null){
                this.repeatedPassword = "";
            }else {
                this.repeatedPassword = repeatedPassword;
            }
            if(typeof imageUrl === "undefined" ||imageUrl === null){
                this.imageUrl = "null";
            }else {
                this.imageUrl = imageUrl;
            }
}
}