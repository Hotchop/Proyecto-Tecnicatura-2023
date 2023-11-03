import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { user } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:4000/users'
  private user? : user;

  constructor(private http: HttpClient, private router: Router) { }

  /**Si lo encuentra devuelve el user, sino undefined */
  get currentUser(): user | undefined {
    if(!this.user) return undefined
    return {...this.user}
  }

  /**Realiza un get del listado de usuarios observable*/
  getUsers(): Observable<user[]>{
    return this.http.get<user[]>(this.url)
  }

  /**Verifica que el usuario y contraseña son correctos y existen */
  verficaUserAndPass(user: string, pass: string){
    this.getUsers().subscribe(users => {
      users.find(u => {
        if(u.constraseña === pass && u.usuario === user){
          this.user = u;
          localStorage.setItem('token',u.id!.toString())
          this.router.navigate(['/profile'])
        }
      })
    })
  }

  /**Verifica si el usuario esta logueado o no */
  checkStatusAutentication(): Observable<boolean>{
    const token = localStorage.getItem('token')
      if (!token) {
        return of(false)
      }
      return this.http.get<user>(`${this.url}/${token}`)
        .pipe(
          tap(u => this.user = u),
          map(u => !!u),
          catchError(err => of(false))
        )
    }


    /**Desloguea al usuario */
    logout(){
      this.user = undefined;
      localStorage.clear()
    }
}
