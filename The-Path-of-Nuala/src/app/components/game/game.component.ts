import { Component, OnInit } from '@angular/core';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{

  private app: PIXI.Application<HTMLCanvasElement> = new PIXI.Application({
    
  });

  ngOnInit(): void {
    document.getElementById('window')!.appendChild(this.app.view);
  }
}
