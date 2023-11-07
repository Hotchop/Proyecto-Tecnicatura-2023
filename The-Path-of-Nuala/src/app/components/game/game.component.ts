import { chartNumber } from './../../enums/enums';
import { ChartopiaService } from './../../services/chartopia.service';
import { Chart, Enemy } from './../../interfaces/interfaces';
import { Component, OnInit, inject } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  enemy: Enemy

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
      namePlate: PIXI.Text;
  
      constructor(hp: number, dmg: number,chartopia: ChartopiaService) {
        this.name = '';
        this.hp = hp;
        this.dmg = dmg;
        this.sprite = PIXI.Sprite.from('/assets/game-assets/enemy-ph.png');
        this.sprite.anchor.set(0.5);
        this.sprite.x = 650;
        this.sprite.y = 300;
        this.sprite.scale.x *= -1;
        this.namePlate = new PIXI.Text(this.name,style);
        this.namePlate.anchor.set(0.5);
        this.namePlate.y = this.sprite.y - 150;
        this.namePlate.x = this.sprite.x;

        getRandomName(chartNumber.NAME,chartopia,(error,result) => {
          if(result !== undefined){
            this.name = result;
            this.namePlate.text = this.name;
          }else{
            this.name = 'Enemy';
            this.namePlate.text = this.name;
          }
        })
      }

    }

    function getRandomName(chartNumber:chartNumber,chartopia:ChartopiaService,callback: (error: Error | null, result?: string) => void){
        chartopia.rollChart(chartNumber).subscribe(
          (response: Chart) => {
            if(response){
               callback(null,response.results[0]);
            }else{
              callback(new Error('No response'), undefined)
            }
          }
        )
    }

    const newEnemy = new enemy(100,5,this.chartopia);

    this.app.stage.addChild(newEnemy.sprite)
    this.app.stage.addChild(newEnemy.namePlate)
    this.app.stage.render
    

  }



  
  
}
