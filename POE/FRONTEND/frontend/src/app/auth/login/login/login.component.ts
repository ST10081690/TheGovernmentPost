import { Component, OnInit, SecurityContext } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authservice: AuthServiceService, private router: Router, public inputSanitiser: DomSanitizer) {}
  
  redirect: string = this.router.url

  ngOnInit(): void{

  }

  //Sending values to log user in
  onlogin(loginform: NgForm){

    //Error handling
    if (loginform.invalid){
      alert('Invalid Details.');
    }
    else{

    //Input sanitisation and submitting
    this.authservice.login(
      this.inputSanitiser.sanitize(SecurityContext.HTML, loginform.value.enteredusername),
      this.inputSanitiser.sanitize(SecurityContext.HTML, loginform.value.enteredpassword));
    }
  }
}
