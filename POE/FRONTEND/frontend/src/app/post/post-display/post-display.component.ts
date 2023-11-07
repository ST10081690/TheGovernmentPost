import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';
import { Post } from '../post-service.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit{

  posts:any[] = [];

  constructor(private postservice: PostServiceService, public authService : AuthServiceService, private router : Router) { }
  
  public postsubscription : Subscription = new Subscription();

  ngOnInit() {

    //Getting token
    let token = this.authService.getToken();

    //Authenticating user
    if(!token){

      alert('Please Login');

      this.router.navigateByUrl('/login')
      
    }
    else{
      this.fetchPosts();
    }
    
  }

  //Getting saved posts
  private fetchPosts(){

    this.postservice.getpost_service().subscribe(data => {this.posts =  Object.values(data.posts)});

  }
    ngOnDestroy()
    {
      this.postsubscription.unsubscribe();
    }

    ondelete(postid: string)
    {
      this.postservice.deletepost_service(postid)
    }

    
  //Logging user out
  logoutFunction(){
    alert('You have been logged out. \nSee you soon!')
    this.authService.userlogout();
  }
    
  }

