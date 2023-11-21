import * as PIXI from 'pixi.js';
import { healthbarEn } from 'src/app/enums/enums';

export class healthbar{
    playerHealth:PIXI.Sprite;
    barHealth:PIXI.Sprite;
    
    constructor(){
        this.playerHealth=new PIXI.Sprite(PIXI.Texture.from(healthbarEn.HEALTH_BAR));
        this.playerHealth.x=95;
        this.playerHealth.y=15;
        this.playerHealth.width=300/1.6;
        this.playerHealth.height=150/1.6;

        this.barHealth=new PIXI.Sprite(PIXI.Texture.from(healthbarEn.BAR));
        this.barHealth.anchor.set(0);
        this.barHealth.x=150;
        this.barHealth.y=30;
        this.barHealth.width=200/1.6;
        this.barHealth.height=100/1.6;
    }
}