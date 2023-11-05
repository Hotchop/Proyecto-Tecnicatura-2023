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
import { NewUserComponent } from './components/new-user/new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HomeSectionComponent } from './components/home-parts/home-section/home-section.component';
import { HomeSectionCitiesComponent } from './components/home-parts/home-section-cities/home-section-cities.component';
import { HomeSectionCharactersComponent } from './components/home-parts/home-section-characters/home-section-characters.component';
import { HttpClientModule } from '@angular/common/http';
import { LogUserComponent } from './components/log-user/log-user.component';
import { HomeSectionPlayNowComponent } from './components/home-parts/home-section-play-now/home-section-play-now.component';
import { ContactsectionComponent } from './components/contactus-parts/contactsection/contactsection.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserInfoComponent } from './components/profile-parts/user-info/user-info.component';
import { UserScoresComponent } from './components/profile-parts/user-scores/user-scores.component';

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
    GameComponent,
    NewUserComponent,
    HomeSectionComponent,
    HomeSectionCitiesComponent,
    HomeSectionCharactersComponent,
    LogUserComponent,
    HomeSectionPlayNowComponent,
    ContactsectionComponent,
    ProfileComponent,
    UserInfoComponent,
    UserScoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
