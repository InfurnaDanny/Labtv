import { Component, OnInit } from '@angular/core';
import { FilmAquiredService } from '../services/film-aquired.service';

@Component({
  selector: 'app-film-acquistati',
  templateUrl: './film-acquistati.component.html',
  styleUrls: ['./film-acquistati.component.scss']
})
export class FilmAcquistatiComponent implements OnInit {

  constructor(
    private filmAquired:FilmAquiredService
  ) { }

  ngOnInit(): void {
    this.filmAquired.filmAquired().subscribe( // dal database chiamo la lista dei film acquistati dall'utente 
      data => {
        console.log(data);

        this.filmAquiredArray = data; // creo un array con i film acquistati dall'utente loggato
      },
      err => console.log(err)
    )
  }

  filmAquiredArray:any[] = [] // array dei film aquistati

  refundFilm(filmId:number, e:any){ 
    e.preventDefault();
    
    // chiedo la conferma prima di restituire il film
    let confirmDelete:any = confirm('Sei sicuro di voler restituire il film?')

    if(confirmDelete){ 
      // se la restituzione è confermata, elimino il film dal db. passo l'id del film alla chiamata e ritorno l'array filtrato
      this.filmAquired.deleteFilm(filmId).subscribe();
      this.filmAquiredArray = this.filmAquiredArray.filter(el => {return el.id != filmId}); 
    } else return
  }
}
