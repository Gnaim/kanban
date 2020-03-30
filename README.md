# Kanban Application
a kanban application with Angular 2+ as front-end framework and expressJS as back-end framework and mongoDB as database

# Useful instructions

SIGNUP : After the sign up you will receive a mail of confirmation. If you don't confirm your mail you won't be able to acces to the application.<br/>

RESET PASSWORD : You can reset your password if you forgot it by entring the mail that you used in the sign up and u will receive an email to reset your password.<br/>

ADD A MEMBER TO A PROJECT : if you add an email of a member who don't have an account he will receive an invitation email to create an account. When he will sign up he will assigned automatically to the project.<br/>

# Database 

There is no configuration needed for the database. It's hosted in the cloud.

NB : the connection with the database is always refused if you are connected with the university network. If you got an error try to connect with another connection

# API & Front Installation 

### Back-End

Go to API directory 
    
    cd webApi

Install packages :

    npm install 

Launch : 

    npm start

ta taa !

NB : You will find more information in the webApi/Readme.md 


### Front-End

Go to 
    
    cd webClient

Install packages : 
    
    npm install

Launch :
    
    ng serve -o 
    
You can access to the application with the following url : localhost:4200

We didn't generate a prod version because we didn't deploy our application :) :) 
