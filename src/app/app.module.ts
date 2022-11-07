import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragScrollModule } from 'ngx-drag-scroll';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './carousel/carousel.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { FilmAcquistatiComponent } from './film-acquistati/film-acquistati.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginUserComponent } from './login/login-user/login-user.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    CarouselComponent,
    NotFoundComponent,
    ContactComponent,
    FilmDetailComponent,
    LoginComponent,
    SearchComponent,
    FilmAcquistatiComponent,
    RegisterComponent,
    LoginUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragScrollModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
