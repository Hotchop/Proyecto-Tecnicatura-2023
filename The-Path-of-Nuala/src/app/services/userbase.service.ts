import { user } from '../interfaces/interfaces';
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
      alert('Error al recibir usuarios')
    }
  }


  async postUser(user: user){
    try {
      await fetch(this.url,{
        method: 'POST',
        body: JSON.stringify(user),
        headers:{'Content-type':'application/json'}
      })
      this.router.navigate(['login']);
    } catch (error) {
      alert('Error al crear usuario')
    }
  }
}
