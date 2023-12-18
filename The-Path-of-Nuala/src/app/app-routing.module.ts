import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HowToPlayComponent } from './pages/how-to-play/how-to-play.component';
import { PlayComponent } from './pages/play/play.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginGuard } from './guards/login-guard';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]}, //Puede accederse al login y register si no estas logueado
  {path:'register',component:RegisterComponent,canActivate:[LoginGuard]},
  {path:'contact-us', component:ContactUsComponent},
  {path:'how-to-play', component:HowToPlayComponent},
  {path:'play',component:PlayComponent,canActivate:[AuthGuard]},  //Puede accederse al perfil y al juego si esta logueado
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
