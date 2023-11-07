import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private logToken!: string;

  private loggedUser = new Subject<boolean>();

  constructor(private http: HttpClient, private appRouter : Router) { }

  //Registering new user
  signup (userusername:string | null, username: string | null, userpassword: string | null)
  {
    const data: UserData = {username:userusername, name: username, password: userpassword}
    
    this.http.post('https://localhost:3000/api/users/signup', data)
    .subscribe(response =>{

      this.appRouter.navigateByUrl('/login');
    });

  }

  //Logging user in
  login (userusername:string | null, userpassword: string | null)
  {
    const data = {username:userusername, password: userpassword};
    this.http.post<{token: string}>('https://localhost:3000/api/users/login', data)
    .subscribe(response =>{
      const token = response.token;
      this.logToken = token;

      //Setting boolean to true as user has logged in
      this.loggedUser.next(true);

      //Directing user to posts page
      this.appRouter.navigateByUrl('/allposts');
    }
    );
  }


  //Checking if user is logged in
  isUserLogged(){

    //Checking if token has a value
    if (this.logToken == ""){
      return false;
    }
    else {
      return true;
    }
  }

  //Getting token from login
  getToken(){
    return this.logToken;
  }


  //Logging user out
  userlogout(){

    //Clearing token
    this.logToken = "";

    //Setting boolean to false as user is no longer logged in
    this.loggedUser.next(false);

  }
}

export interface UserData{

  username: String | null,
  name: String | null,
  password: String | null,
}
