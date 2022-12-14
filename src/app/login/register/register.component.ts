import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl } from '@angular/forms';
import { User } from '../../Interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regExpPsw:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@£€$'!~,;:_^=?*+#.&§%°(){}|[/]{8,}$/;
  regExpEmail:RegExp = /^[\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4}$/;
  regExpUsername:RegExp = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9_]+(?<![_.])$/

  registerForm:any = FormGroup;

  constructor(
    private fb: FormBuilder, // form builder dei form reactive
    private authService:AuthService, // Service dell'autenticazione
    private route:Router
  ) { }

  ngOnInit(): void {
    // reactive form con validazione per il form di registrazione
    this.registerForm = this.fb.group({
      registerUsername: new FormControl ('',[Validators.required, Validators.minLength(5), Validators.pattern(this.regExpUsername)]),
      registerEmail: new FormControl ('',[Validators.required, Validators.email, Validators.pattern(this.regExpEmail)]),
      registerPassword: new FormControl ('',[Validators.required, Validators.pattern(this.regExpPsw)]),
      privacy: [false, Validators.required],
    });
  }

  username:string = ''; // Two way Binding per login/registrazione
  email:string = '';
  password:string = '';

  isErrorVisible:boolean = false; // gestione span error/success
  myMessage:string = '';
  typeMessage:boolean = false;

  // invio in output il booleano per la visione della modale
  @Output() isModaleVisible = new EventEmitter<boolean>() 

  modalVisible(value:boolean){ // passo il valore true o false in base alla modale che voglio mostrare
    this.isModaleVisible.emit(value)
  }

  register(form:any){
    console.log(form.value);
    
    const user:User = { // salvo i valori registrati
      username: form.value.registerUsername,
      email: form.value.registerEmail,
      password: form.value.registerPassword
    } 

    this.authService.registerAuthorize(user).subscribe(
      data => { 
        // se avvenuto con successo mostro il messaggio di registrazione avvenuta e mostro la modale login
        console.log(data)

        this.typeMessage = true;
        this.isErrorVisible = true;
        this.myMessage = 'Registrazione effettuata con successo'

        setTimeout(() => {
          this.modalVisible(true);
          this.isErrorVisible = false;
          this.myMessage = '';
          this.typeMessage = false;
        }, 2000); 
      },
      err => {
        // gestisco l'errore in modo che si veda lo span e il tipo di errore
        this.isErrorVisible = true;
        this.myMessage = `${err.error} | ${err.status} - ${err.statusText}`

        setTimeout(() => {
          this.isErrorVisible = false;
          this.myMessage = ''
        }, 2000);
      }    
    )
   }
}
