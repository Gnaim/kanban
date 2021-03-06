export class User {
    email:string;
    password:string;
    firstName:string;
    lastName:string;
    tel:number;
    profession:string;
    newPassword:string;
    role:string;
    image:string;

    constructor(email:string,password:string,firstName?:string,lastName?:string,tel?:number,image?:string,profession?:string,role?:string,newPassword?:string) {
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
            if(typeof newPassword === "undefined" ||newPassword === null){
                this.newPassword = "";
            }else {
                this.newPassword = newPassword;
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
            if(typeof profession === "undefined" ||profession === null){
                this.profession = "";
            }else {
                this.profession = profession;
            }
            if(typeof role === "undefined" ||role === null){
                this.role = "";
            }else {
                this.role = role;
            }
            if(typeof tel === "undefined" ||tel === null){
                this.tel = 0;
            }else {
                this.tel = tel;
            }
            if(typeof image === "undefined" ||image === null){
                this.image = null;
            }else {
                this.image = image;
            }
}
}