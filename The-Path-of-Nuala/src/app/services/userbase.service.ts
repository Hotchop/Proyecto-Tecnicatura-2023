import { User } from '../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserbaseService {

  url = "http://localhost:4000/users"

  constructor(private router: Router) { }

  async getUsers(){
    try {
      const response = await fetch(this.url);
      const list = response.json();
      return list;
    } catch (error) {
      alert('Error while getting users')
    }
  }


  async postUser(user: User){
    try {
      await fetch(this.url,{
        method: 'POST',
        body: JSON.stringify(user),
        headers:{'Content-type':'application/json'}
      })
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Error while creating user')
    }
  }

  async deleteUser(id: number){
    try {
      await fetch(`${this.url}/${id}`,{method: 'DELETE'});
      this.router.navigate(['/home']);
    } catch (error) {
      alert('Error while deleting user')
    }
  }
}
