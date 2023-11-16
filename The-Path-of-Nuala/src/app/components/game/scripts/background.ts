import * as PIXI from 'pixi.js';
import { backgrounds } from 'src/app/enums/enums';

export class backgroundClass{
    stageName: string;
    sprite:PIXI.Sprite;


    constructor(stageNumber:number){
        switch(stageNumber){
            case 1:
                this.stageName='Naberoa_Tavern'
                this.sprite=new PIXI.Sprite(PIXI.Texture.from(backgrounds.FIGHT1));
                this.sprite.x=0;
                this.sprite.y=0;
                this.sprite.width=800;
                this.sprite.height=600;
            break;
            case 2:
                this.stageName='Naberoa_Tavern'
                this.sprite=new PIXI.Sprite(PIXI.Texture.from(backgrounds.FIGHT2));
                this.sprite.x=0;
                this.sprite.y=0;
                this.sprite.width=800;
                this.sprite.height=600;
            break;
        }
    }
}