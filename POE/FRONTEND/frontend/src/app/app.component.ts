import { Component , OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Government Post.';

  constructor (private authService: AuthServiceService){}

  ngOnInit(): void{

  }

  //logging user out
  logoutFunction(){
    alert('You have been logged out. \nSee you soon!')
    this.authService.userlogout();
  }
}
