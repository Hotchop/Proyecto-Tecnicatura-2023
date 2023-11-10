import { scorer } from './scripts/scoring';
import { UserbaseService } from 'src/app/services/userbase.service';
import { ChartopiaService } from './../../services/chartopia.service';
import { Component, OnInit} from '@angular/core';
import * as PIXI from 'pixi.js';
import { enemy } from './scripts/commonEnemy';
import { AuthService } from 'src/app/services/auth.service';
import { Character } from 'src/app/interfaces/interfaces';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  scoring: scorer;

  constructor(private chartopia: ChartopiaService, private auth: AuthService, private userbase: UserbaseService){
    this.scoring = new scorer(auth,userbase);
  }

  private app: PIXI.Application<HTMLCanvasElement> = new PIXI.Application({});

  ngOnInit(): void {
    document.getElementById('window')!.appendChild(this.app.view);
    this.fight();

  }
  
  fight() {
    const newEnemy = new enemy(100,5,this.chartopia);

    this.app.stage.addChild(newEnemy.sprite,newEnemy.namePlate)
    this.app.stage.render

    /* *
     * Esta es una prueba para ver si los eventos de click y la carga de partidas funciona
     */
    /* const char: Personaje = {
      charName: 'Prueba'
    }
    newEnemy.sprite.eventMode = 'static';
    newEnemy.sprite.addEventListener('click',() => {this.scoring.addSave(char,10000)}) */
  }


  
  

}
