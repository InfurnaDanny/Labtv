import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IFilm } from '../Interfaces/film';

@Injectable({
  providedIn: 'root'
})
export class FilmAquiredService {

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = { //header per il login
    headers: new HttpHeaders(
      {'Authorization': `Bearer ${localStorage.getItem('loggedIn')}`}
    )
  }

  wsFilms:string = 'http://localhost:3000/600/users' // endpoint per l'aggiunta di film

  filmAquired():Observable<any>{
    let idUser:any = localStorage.getItem('id')

    return this.http.get(`${this.wsFilms}/${idUser}/films-acquistati`, this.httpOptions)
  }

  addFilm(film:IFilm):Observable<any>{
    let idUser:any = localStorage.getItem('id')

    return this.http.post(`${this.wsFilms}/${idUser}/films-acquistati`, film, this.httpOptions)
  }

  wsDeleteFilm:string = 'http://localhost:3000/films-acquistati/'

  deleteFilm(idFilm:number):Observable<any>{

    return this.http.delete(`${this.wsDeleteFilm}/${idFilm}`, this.httpOptions)
  }
}
