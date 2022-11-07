import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl } from '@angular/forms';
import { User } from '../../Interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  regExpPsw:RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@£€$'!~,;:_^=?*+#.&§%°(){}|[/]{8,}$/;
  regExpEmail:RegExp = /^[\-\w\.]+@([\-\w]+\.)+[\-\w]{2,4}$/;

  loginForm:any = FormGroup;

  constructor(
    private fb: FormBuilder, // form builder dei form reactive
    private authService:AuthService // Service dell'autenticazione
  ) { }

  ngOnInit(): void {
    // reactive form con validazione per il form di login
    this.loginForm = this.fb.group({
      loginEmail: new FormControl ('', [Validators.required, Validators.email, Validators.pattern(this.regExpEmail)]),
      loginPassword: new FormControl ('',[Validators.required, Validators.pattern(this.regExpPsw)])
    })
  }

  email:string = '';
  password:string = '';

  auth_service:any = {} // contenitore del token di accesso
  token:any = ''; // Access Token dell'Utente

  isErrorVisible:boolean = false;
  errorMessage:string = '';

  login(form:any){
    
    const user:User = { // assegno le credenziali d'accesso
      email: form.value.loginEmail,
      password: form.value.loginPassword
    }

    console.log(user);
    
    
    this.authService.authorize(user).subscribe( // invio l'user all'headers della chiamata
      res => {   
        console.log(res.user.id);     
        this.token = res.accessToken.toString(),

        
        this.authService.loginAuthorize(this.token, res.user.id).subscribe( // accesso sicuro tramite token
          res => {         
            
            // salvo il token e l'username nel local storage
            localStorage.setItem('loggedIn', this.token);
            localStorage.setItem('username', res.username);
            localStorage.setItem('id', res.id);

            
            window.location.href = '/home'; //ricarico la pagina per mostrare il nome dell'user al posto di "accedi"

          }
        )
      },
      err => {
        // gestisco l'errore in modo che si veda lo span e il tipo di errore
        this.isErrorVisible = true;
        this.errorMessage = `${err.error} | ${err.status} - ${err.statusText}`

        setTimeout(() => {
          this.isErrorVisible = false;
          this.errorMessage = ''
        }, 2000);
      }
    )
  }

  // invio in output il booleano per la visione della modale
  @Output() isModaleVisible = new EventEmitter<boolean>()

  modalVisible(value:boolean){ // passo il valore true o false in base alla modale che voglio mostrare
    this.isModaleVisible.emit(value)
  }
}
