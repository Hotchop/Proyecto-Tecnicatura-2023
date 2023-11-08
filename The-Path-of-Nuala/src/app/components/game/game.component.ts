import { ChartopiaService } from './../../services/chartopia.service';
import { Component, OnInit} from '@angular/core';
import * as PIXI from 'pixi.js';
import { enemy } from './scripts/commonEnemy';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  constructor(private chartopia: ChartopiaService){}

  private app: PIXI.Application<HTMLCanvasElement> = new PIXI.Application({});

  ngOnInit(): void {
    document.getElementById('window')!.appendChild(this.app.view);
    this.fight();
  }
  
  fight() {
    const newEnemy = new enemy(100,5,this.chartopia);

    this.app.stage.addChild(newEnemy.sprite)
    this.app.stage.addChild(newEnemy.namePlate)
    this.app.stage.render
  }

  
}
