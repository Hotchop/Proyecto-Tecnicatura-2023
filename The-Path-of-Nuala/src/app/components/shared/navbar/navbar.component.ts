import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

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
