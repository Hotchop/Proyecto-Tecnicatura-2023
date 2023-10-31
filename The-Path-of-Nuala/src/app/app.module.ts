import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HowToPlayComponent } from './pages/how-to-play/how-to-play.component';
import { PlayComponent } from './pages/play/play.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HowToPlayComponent,
    PlayComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
