import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  scrolled:boolean=false;
  visible:boolean=false;
  openVisible:boolean=false;
  closeNavbar:boolean=false;
  closedMenu:boolean=false;
  @HostListener('window:scroll',[])
  onWindowScroll(){
    if(window.scrollY>50){
      this.scrolled=true;
    }else{
      this.scrolled=false;
    }
  }
  onKey(event:any){
    this.visible=true;
    this.openVisible=true;
    this.closeNavbar=false;
    this.closedMenu=false;
  }
  closeMenu(event:any){
    this.closeNavbar=true;
    this.openVisible=false;
    this.closedMenu=true;
  }
}
