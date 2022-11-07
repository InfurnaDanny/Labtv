import { NgModule,  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from './contact/contact.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { FilmAcquistatiComponent } from './film-acquistati/film-acquistati.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'film', redirectTo: '/home', pathMatch:'full'},
  {path:'contact', component: ContactComponent},
  {path:'login', component: LoginComponent},
  {path:'film/:nomeFilm', component: FilmDetailComponent},
  {path:'film_aquistati', component: FilmAcquistatiComponent, canActivate: [AuthGuard]},
  
  
  {path:'**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
