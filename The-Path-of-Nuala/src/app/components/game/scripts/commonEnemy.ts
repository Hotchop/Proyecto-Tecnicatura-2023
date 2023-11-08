import * as PIXI from 'pixi.js';
import { Enemy } from 'src/app/interfaces/interfaces';
import { chartNumber } from 'src/app/enums/enums';
import { ChartopiaService } from 'src/app/services/chartopia.service';
import { getRandomName, nameplateStyle } from './randomNameGenerator';

/**Common Enemy Constants */
const enemyDefaultName = 'Enemy'
const enemyDefaultSprite = '/assets/game-assets/enemy-ph.png'

/**
 * Common enemy class. Sets name and nameplate using the getRandomName function
 */
export class enemy implements Enemy {
    name: string;
    hp: number;
    dmg: number;
    sprite: PIXI.Sprite;
    namePlate: PIXI.Text;

    constructor(hp: number, dmg: number,chartopia: ChartopiaService) {
      //Stats setup
      this.hp = hp;
      this.dmg = dmg;
      
      //Sprite setup
      this.sprite = PIXI.Sprite.from(enemyDefaultSprite);
      this.sprite.anchor.set(0.5);
      this.sprite.x = 650;
      this.sprite.y = 300;
      this.sprite.scale.x *= -1;
      
      //PIXI text setup
      this.namePlate = new PIXI.Text('',nameplateStyle);
      this.namePlate.anchor.set(0.5);
      this.namePlate.y = this.sprite.y - 150;
      this.namePlate.x = this.sprite.x;

      getRandomName(chartNumber.NAME,chartopia,(error,result) => {
        if(error || result === undefined){
          this.name = enemyDefaultName;
          this.namePlate.text = enemyDefaultName;
          console.log(result);
        }else{
            this.name = result;
            this.namePlate.text = result;
            console.log(result);
        }
      })
    }

  }