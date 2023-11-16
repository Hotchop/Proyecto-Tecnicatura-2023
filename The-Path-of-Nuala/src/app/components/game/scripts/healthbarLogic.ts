import * as PIXI from 'pixi.js';
import { healthbarEn } from 'src/app/enums/enums';

export class healthbar{
    playerHealth:PIXI.Sprite;
    barHealth:PIXI.Sprite;
    
    constructor(){
        this.playerHealth=new PIXI.Sprite(PIXI.Texture.from(healthbarEn.HEALTH_BAR));
        this.playerHealth.x=95;
        this.playerHealth.y=40;
        this.playerHealth.width=120*1.5;
        this.playerHealth.height=38*1.5;

        this.barHealth=new PIXI.Sprite(PIXI.Texture.from(healthbarEn.BAR));
        this.barHealth.x=120;
        this.barHealth.y=48;
        this.barHealth.width=165;
        this.barHealth.height=40;
    }
}