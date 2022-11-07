import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl } from '@angular/forms';
import { User } from '../Interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {}

  @Input() isModaleVisible:boolean = true // all'apertura della pagina mostro la modale del login

  modalVisible(value:boolean){ // dai componenti figli (login/user) dico se la modale è true o false
    this.isModaleVisible = value;
  }

}
