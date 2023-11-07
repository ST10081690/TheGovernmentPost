//Referencing:
//The Independent Institute of Education. 2023. APDS7311 Lab Guide.

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import { Router } from '@angular/router';
import { UserData } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})

export class PostServiceService {

  private postdisplay:{_id:string,title:string,department:string, body:string, dateAdded:string}[]= [];
  private updatedpostdisplay = new Subject<{_id:string,title:string,department:string, body:string, dateAdded:string}[]>();

  constructor(private https: HttpClient, private authService : AuthServiceService, private appRouter: Router) {}

  //REFERENCING:
  //https://www.youtube.com/watch?v=oTObLWih_EA

  //Sending post request to save post
  addpost_service(postData: {title:string | null, department:string | null, body:string | null, dateAdded:string})
  {
    const token: string = this.authService.getToken();

    if(!token){
      alert('Please Login')
      this.appRouter.navigateByUrl('/login');
    }
    else{

    let headerValues = new HttpHeaders().set("Authorization","bearer " + token);
 
    this.https.post('https://localhost:3000/api/posts',postData, {headers:headerValues}).subscribe((postData)=>
    {
      console.log(postData);
      this.appRouter.navigateByUrl('/allposts');
    });
    }
  }
  
  //Sending get request to retrieve saved posts
  getpost_service(): Observable<any> {

    let token = this.authService.getToken();

    let headerValues = new HttpHeaders().set("Authorization","bearer " + token);

    return this.https.get('https://localhost:3000/api/posts', {headers:headerValues});
   
  }

  //Sending delete request to delete specific post
  deletepost_service(postid:string){
    
    let token = this.authService.getToken();
    let headerValues = new HttpHeaders().set("Authorization","bearer " + token);

    this.https.delete('https://localhost:3000/api/posts/' + postid, {headers:headerValues})
    .subscribe(()=>
    {
      const updatedpostdeleted = this.postdisplay.filter(post=>post._id!==postid);
      this.postdisplay = updatedpostdeleted;
      this.updatedpostdisplay.next([...this.postdisplay]);

      alert('Post Deleted!')
      this.appRouter.navigateByUrl('/allposts');
    })
  }

  getUpdateListener(){
    return this.updatedpostdisplay.asObservable();
  }

}

export interface Post {
  _id: string;
  title: string | null; 
  department: string | null;
  body: string | null;
  dateAdded: string;
}
