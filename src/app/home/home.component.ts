import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private movieService:MovieService) { }

  ngOnInit(): void {
    this.getMovie(); 
  }

  movieArray:any[] = []; // creo un array che conterrà tutti i film dell'API
  movie:any[] = []; // contenitore che verrà iterato nella pagina
  movieSearched:any[] = [];

  getMovie(){ // metodo che richiama l'Api Imdb Most Popular Movie
    
    this.movieService.getMovie().subscribe( //chiamo l'api che restituisce la lista film
      (data)=>{
        console.log(data);
        
        for(let i = 0; i < data.items.length; i++){ 
            // Rimpiazzo un pezzo di stringa che serve a restituirmi l'immagine alla massima risoluzione
            if(data.items[i].image.length > 115){
              data.items[i].image = data.items[i].image.slice(0,117)
            }
          }
        
        this.movieArray = data.items; // Assegno i dati ricevuti all'array "movieArray"

        this.movieSearched = [...this.movieArray] // inietto tutti gli item all'array da mandare al componente search

        for(let i = 0; this.movie.length < 25; i++){ // inietto nel movieArray i primi 25 item
          this.movie.push(this.movieArray[i])
        }         
      })
  }  

  actNum:number = 2; // questo sarà il moltiplicatore dei film da pushare nell'Array Movie

  getMovieOnScroll(){
    /* se i film nell'array iterato sono meno del numero dei film totali dell'API
       allora ne aggiungo 25 a quelli già presenti e aumento il moltiplicatore */
    if(this.actNum * 25 <= this.movieArray.length){
    
      for(let i = this.movie.length; this.movie.length < this.actNum * 25; i++){
        this.movie.push(this.movieArray[i])
      }
      
      this.actNum++
    }
  }

  searchValue:string = '';

  searchThis(){
    // creo un nuovo array filtrando gli elementi tramite l'input scritto nella searchbar
    let newArray = this.movieArray.filter(
      el => {return el.fullTitle.toLowerCase().includes(this.searchValue.toLocaleLowerCase())})  
    
    //Inietto il nuovo array all'interno dell'array iterato nel modulo app-search
    this.movieSearched = [...newArray]
  }
    
}
