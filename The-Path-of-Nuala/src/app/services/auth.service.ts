import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:4000/users'
  private user? : User;

  constructor(private http: HttpClient, private router: Router) { }

  /**Si lo encuentra devuelve el user, sino undefined */
  get currentUser(): User | undefined {
    if(!this.user) return undefined
    return {...this.user}
  }

  /**Realiza un get del listado de usuarios observable*/
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }

  /**Verifica que el usuario y contraseña son correctos y existen */
  verficaUserAndPass(username: string, pass: string, onComplete: (user?: User) => void): void {
    this.getUsers().subscribe(users => {
      const user: User | undefined = users.find(u => u.usuario === username)

      if (user === undefined || user.constraseña !== pass){
        onComplete(undefined);
      }else{
        this.user = user;
        localStorage.setItem('token',user.id!.toString())
        this.router.navigate(['/profile'])
        onComplete(user);
      }
    })  
  }

  /**Verifica si el usuario esta logueado o no */
  checkStatusAutentication(): Observable<boolean>{
    const token = localStorage.getItem('token')
      if (!token) {
        return of(false)
      }
      return this.http.get<User>(`${this.url}/${token}`)
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
