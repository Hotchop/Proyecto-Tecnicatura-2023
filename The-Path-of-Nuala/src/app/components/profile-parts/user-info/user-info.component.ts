import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserbaseService } from 'src/app/services/userbase.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  constructor(private userbase: UserbaseService,private auth: AuthService, private router: Router){}

  get getUser():User | undefined{
    return this.auth.currentUser;
  }

  async delete(){
    try {
      if(confirm('Are you sure you want to delete your account? This action is irreversible!')){
        const user: User | undefined  = this.getUser 
        if (user){
          await this.userbase.deleteUser(user.id!);
        }else{
          alert('User is not logged')
        }
        this.router.navigate(['/login'])
      }
    } catch (error) {
      alert('Error deleting account')
    }
  }


  onLogOut(){
    if(confirm('Are you sure you want to log out?')){
      this.auth.logout();
      this.router.navigate(['/login'])
    }
  }

}

