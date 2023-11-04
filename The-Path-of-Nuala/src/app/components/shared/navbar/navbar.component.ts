import { Component, HostListener } from '@angular/core';
import { AuthGuard } from 'src/app/guards/auth-guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loggedStatus;

  constructor(){
    this.loggedStatus = AuthGuard;
  }

  scrolled:boolean=false;
  @HostListener('window:scroll',[])
  onWindowScroll(){
    if(window.scrollY>50){
      this.scrolled=true;
    }else{
      this.scrolled=false;
    }
  }

}
