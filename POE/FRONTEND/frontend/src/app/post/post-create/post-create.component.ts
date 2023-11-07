import { Component, SecurityContext } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PostServiceService } from '../post-service.service';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  title: string = '';
  department: string = '';
  body: string = '';
  dateAdded: string = '';
  
  constructor(public postservice: PostServiceService, public authService : AuthServiceService, private router : Router, public inputSanitiser: DomSanitizer){ }
  
  ngOnInit(): void{

    //Getting token
    let token = this.authService.getToken();

    //Authenticating user
    if(!token){
      alert('Please Login');

      this.router.navigateByUrl('/login')
    }
  }    
  

  onaddpost(postform: NgForm){
  
    //Error handling
    if(postform.value.title == "" || postform.value.department == "" || postform.value.body == ""){
      
      alert('Invalid Post. Please fill out every field.')

    }
    else{

    //Getting current date to save with post
    const date = new Date();
    const postDate = date.toISOString().slice(0, 10);

    //Input sanitisation and submitting
    const postData = {title: this.inputSanitiser.sanitize(SecurityContext.HTML,postform.value.title), department: this.inputSanitiser.sanitize(SecurityContext.HTML,postform.value.department), body: this.inputSanitiser.sanitize(SecurityContext.HTML,postform.value.body), dateAdded: postDate};
    this.postservice.addpost_service(postData);

    //Resetting form values
    postform.resetForm();
    }
  }

     //Logging user out
     logoutFunction(){
      alert('You have been logged out. \nSee you soon!')
      this.authService.userlogout();
    }
}
