import { Save, User } from '../interfaces/interfaces';
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

  /**
   * PATCH method for adding new scores to the user profile
   * @param scores The updated list of scores with the most recent game included
   * @param id The logged user id that is saving the scores
   */
  async addScore(scores:Save[],id: number){
    try {
      if(scores !== null){
        await fetch(`${this.url}/${id}`,{
          method: 'PATCH',
          body: JSON.stringify({partidas: scores}),
          headers:({'Content-type':'application/json'})
        })
        this.router.navigate(['/profile'])
      }
      else{
        alert("Can't send empty scores")
      }
    } catch (error) {
      alert('Error saving score')
    }
  }
}
