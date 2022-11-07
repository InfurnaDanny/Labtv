import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  // Api imDb dei film più popolari - 'k_m7au22sm' / 'k_g2j3ignj' / 'k_q8j9fsvr' è la mia ApiKey
  wsMovie:string = 'https://imdb-api.com/en/API/MostPopularMovies/k_m7au22sm';

  getMovie():Observable<any>{    
    return this.http.get(this.wsMovie); // faccio la request al db (imDb) di film
  }


  // Api imDb del film singolo con tutte le info
  wsMovieDetail:string = 'https://imdb-api.com/en/API/Title/k_m7au22sm/';

  getMovieDetail(idFilm:any):Observable<any>{
    console.log(this.wsMovieDetail + idFilm);
    return this.http.get(this.wsMovieDetail + idFilm); // request per il dettaglio del singolo film
  }

  wsTrailer:string = 'https://imdb-api.com/en/API/YouTubeTrailer/k_m7au22sm/'

  getTrailer(trailer:any):Observable<any>{
    console.log(this.wsTrailer + trailer);
    
    return this.http.get(this.wsTrailer + trailer); // request per il dettaglio del singolo film
  }
}
