import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { UserbaseService } from 'src/app/services/userbase.service';
import { AuthService } from 'src/app/services/auth.service';
import { partida, user } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-user-scores',
  templateUrl: './user-scores.component.html',
  styleUrls: ['./user-scores.component.css']
})
export class UserScoresComponent {

  constructor(private userbase: UserbaseService,private auth:AuthService,private router: Router){}

  list: partida[] = [];

  get getUser():user | undefined{
    return this.auth.currentUser;
  }

  get partidas():boolean{
    const user = this.getUser
    if(user){
      if(user.partidas.length <= 0){
        return false
      }else{
        this.list = user.partidas;
        return true
      }
    }else{
      return false
    }
  }

  //Hacer g
  
}
