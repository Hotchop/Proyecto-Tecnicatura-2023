import { chartNumber } from './../../enums/enums';
import { ChartopiaService } from './../../services/chartopia.service';
import { Chart, Enemy } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  constructor(private chartopia: ChartopiaService){}

  private app: PIXI.Application<HTMLCanvasElement> = new PIXI.Application({


  });

  ngOnInit(): void {
    document.getElementById('window')!.appendChild(this.app.view);
    this.fight();
  }
  
  fight() {
    const style = new PIXI.TextStyle({
      fill: "#ffffff",
      fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, serif",
      fontVariant: "small-caps"
    });
    class enemy implements Enemy {
      name: string;
      hp: number;
      dmg: number;
      sprite: PIXI.Sprite;
  
      constructor(name: string,hp: number, dmg: number) {
        this.name = name;
        this.hp = hp;
        this.dmg = dmg;
        this.sprite = PIXI.Sprite.from('/assets/game-assets/enemy-ph.png');
        this.sprite.anchor.set(0.5);
        this.sprite.x = 650;
        this.sprite.y = 300;
        this.sprite.scale.x *= -1;
      }
    }

    let randomName: string;
    this.chartopia.rollChart(chartNumber.NAME).subscribe(
      (response: Chart) => {
        if(response){
           randomName = response.results[0];
           console.log(randomName);
        }else{
          randomName = 'Default'
          console.log(randomName);
        }
      },
      (error) =>{
        console.error('Error',error);
      }
    )
    

    let newEnemy = new enemy(randomName!,100,5)

    let enemyName = new PIXI.Text(newEnemy.name,style);
    enemyName.anchor.set(0.5);
    enemyName.y = newEnemy.sprite.y - 150;
    enemyName.x = newEnemy.sprite.x;

    this.app.stage.addChild(newEnemy.sprite)
    this.app.stage.addChild(enemyName)
    this.app.stage.render
    

  }



  
  
}
