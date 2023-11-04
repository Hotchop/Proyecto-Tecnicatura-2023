import { Component } from '@angular/core';
import { UserbaseService } from 'src/app/services/userbase.service';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private userbase: UserbaseService){}

  async delete(){
    try {
      await this.userbase.deleteUser(1);
    } catch (error) {
      
    }
  }

}
