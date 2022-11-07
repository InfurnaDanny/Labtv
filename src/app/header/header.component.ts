import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLogged:boolean = false // l'user non è loggato di default
  username:any = '';

  constructor(private authService: AuthService) {
   }

  ngOnInit(): void {
    if(localStorage.getItem('loggedIn')){
      this.isUserLogged = true // se l'utente ha effettuato l'accesso, l'user risulta loggato
      this.username = localStorage.getItem('username')?.toUpperCase();
      this.authService.isLoggegIn = true
    }
  }

  
  logout(): void{
    localStorage.clear();

    this.authService.isLoggegIn = false;

    window.location.reload();
  }
}
