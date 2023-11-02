import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartopiaService {

  //Chartopia URL Builder
  chartURL = 'https://chartopia.d12dev.com/api/charts'
  chartCommand = 'roll/'

  //Chartopia Charts
  names = 76281;  //1000 Character Names for Fantasy (d1000)
  dungeon = 20234;  //Random dungeon name generator
  tavern = 114; //Tavern Name Generator (d20)
  spell = 46433; //Spell Name (1d2)

  constructor(private http: HttpClient) { }

  /**El metodo ideal de creacion enemigos y mapas es crear una interface para los mismos
   * y tener como atributo el ID del chart donde toman los nombres.
   * Luego, se pasa por parametro a un post general que construye el url en el momento cada vez que se llama
   */

  rollChart(id:number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(`${this.chartURL}/${id}/${this.chartCommand}`, null, httpOptions);
  }

  /**Recibe el id del enemigo / mapa / item del objeto y hace un roll en la tabla de los mismos, devolviendo nombre 
   * Ej de codigo (testear)
  */

  /* async enemyName(){
    this.chartopia.postChart().subscribe(
      (response) => {
        // Handle the response from the server here
        const nombre: chart | undefined = await response.json()
        if (nombre){
          return nombre
        }else{
          return 'Default'
        }
      },
      (error) => {
        // Handle any errors that occurred during the request
        return 'Default'
      }
    );
  } */

}
