import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { FilmAquiredService } from '../services/film-aquired.service';
import { IFilm } from '../Interfaces/film';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {

  constructor(
    private movieService:MovieService,
    private aquiredService:FilmAquiredService,
    private route:ActivatedRoute,
    private sanitizer:DomSanitizer,
    ) {}

  filmID:string = ''; // Inizializzo una stringa vuota che mi servirà per la route di secondo livello

  ngOnInit(): void {
    this.filmID = this.route.snapshot.params['nomeFilm']; // Assegno la route di secondo livello al parametro 'nomeFilm'
    
    this.getMovieDetail(this.filmID) // passo l'id del film al metodo che richiama l'API del film singolo

    this.getTrailer(this.filmID) // passo l'id del film al metodo che richiama l'API del trailer 

    if(localStorage.getItem('id')){
      this.aquiredService.filmAquired().subscribe(
        data =>{
          console.log(data);

          for(let i=0; i<data.length;i++){ 
            
            if(data[i].idFilm.includes(this.filmID)){
              // se nei film acquistati dall'utente, c'è già il film, apparirà il pulsante restituisci
              this.aquired = true
            }
          }
        }
      )
    }
  }

  myFilm:any = '';
  myTrailer:any = '';
  safeURL:any = '';

  tabIsVisible:boolean = true; // SIMILI / DETTAGLI si alternano al true/false

  getMovieDetail(filmID:string){ // metodo che gestisce l'api per il film singolo
    this.movieService.getMovieDetail(filmID).subscribe(
      data => {
        console.log(data)
        
        this.myFilm = data;
    })
  }
  
  getTrailer(filmID:string){
    this.movieService.getTrailer(filmID).subscribe(
      data => {
        console.log(data)

        this.myTrailer = data,
        // causa COVID sanifico l'url di youtube prima di passarlo al metodo che richiama l'API trailer
        this.safeURL =  this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${data.videoId}?autoplay=1&mute=1&controls=0`)
      })
  }

  newMovieDetail(newID:string){ // riassegno l'ID del singolo film a click di uno dei film "Simili"
    this.filmID = newID;

    this.getMovieDetail(this.filmID);
    this.getTrailer(this.filmID)
  }

  aquired:boolean = false;

  buyMovie(id:string, title:string){

      const film:IFilm = {
        idFilm: id,
        title: title
      }

      this.aquiredService.addFilm(film).subscribe(
        data => {
          console.log(data)

          alert('Film acquistato correttamente')
          window.location.reload();
        },
        err => console.log(err)
      )
  }
}
