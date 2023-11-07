import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { chartNumber } from '../enums/enums';
import { Chart } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChartopiaService {

  //Chartopia URL Builder
  chartURL = 'https://chartopia.d12dev.com/api/charts'
  chartCommand = 'roll/'

  constructor(private http: HttpClient) { }

  /**El metodo ideal de creacion enemigos y mapas es crear una interface para los mismos
   * y tener como atributo el ID del chart donde toman los nombres.
   * Luego, se pasa por parametro a un post general que construye el url en el momento cada vez que se llama
   */

  rollChart(chart:chartNumber): Observable<Chart> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<any>(`${this.chartURL}/${chart}/${this.chartCommand}`, null, httpOptions);
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
