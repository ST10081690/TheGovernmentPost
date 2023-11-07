import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor(public authservice: AuthServiceService, private router: Router, public inputSanitiser: DomSanitizer) {}

  ngOnInit(): void{

  }

  //Sending values to register a new user
  onsignup(signupform: NgForm){

    //Error handling
    if(signupform.value.enteredusername == "" || signupform.value.enteredname == "" || signupform.value.enteredpassword == "" || signupform.value.enteredpassword.length < 8){
      
      alert('Invalid Details. Please fill out every field correctly.')

    }else{

    //Input sanitisation and submitting
    this.authservice.signup(
      this.inputSanitiser.sanitize(SecurityContext.HTML, signupform.value.enteredusername), 
      this.inputSanitiser.sanitize(SecurityContext.HTML, signupform.value.enteredname),
      this.inputSanitiser.sanitize(SecurityContext.HTML, signupform.value.enteredpassword));

    alert('Your account has created successfully ' + signupform.value.enteredname + '!');
    this.router.navigateByUrl('/login');
    }
  
  }



}
