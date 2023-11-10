import * as PIXI from 'pixi.js';
import { Enemy} from 'src/app/interfaces/interfaces';
import { enemyActions, chartNumber } from 'src/app/enums/enums';
import { ChartopiaService } from 'src/app/services/chartopia.service';
import { getRandomName, nameplateStyle } from './randomNameGenerator';
import { player } from './player';

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
    dmgMod: number;
    defenseMod: number;
    namePlate: PIXI.Text;
    nextTurn: enemyActions;

    constructor(hp: number, dmg: number,chartopia: ChartopiaService) {
      //Stats setup
      this.hp = hp;
      this.dmg = dmg;
      this.dmgMod = 1;
      this.defenseMod = 1;
      this.nextTurn = enemyActions.ATTACK;
      
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

    enemyTurn(player: player){
      //Clear status
      if(this.defenseMod > 1){
        this.defenseMod = 1
      }
      
      //Use action
      switch(this.nextTurn){
        case enemyActions.ATTACK: {
          player.getHit(this.dmg * this.dmgMod)
          this.dmgMod = 1;
        }
        break
        case enemyActions.STRONG_ATTACK: {
          player.getHit(this.dmg * this.dmgMod * 0.25)
          this.dmgMod = 1;
        }
        break
        case enemyActions.DEFEND: this.defenseMod = 1.25
        break
        case enemyActions.STRONG_DEFEND: this.defenseMod = 1.5
        break
        case enemyActions.DEBUFF: player.setDmgMod = 0.9
        break
        case enemyActions.STRONG_DEBUFF: player.setDmgMod = 0.75
        break
        case enemyActions.BUFF: this.dmgMod = 1.25
        break
        case enemyActions.STRONG_BUFF: this.dmgMod = 1.5
        break
        default:
      }

      //Animate sprite

      //Choose next action
      if(this.nextTurn === enemyActions.BUFF || this.nextTurn === enemyActions.STRONG_BUFF){
        const result = Math.random()
        if(result < 0.75){
          this.nextTurn = enemyActions.ATTACK;
        }else{
          this.nextTurn = enemyActions.STRONG_ATTACK;
        }
      }else{
        this.nextTurn = this.getRandomEnemyAction();
      }
      
    }

    getRandomEnemyAction(): enemyActions {
      const enumValues = Object.keys(enemyActions)
        .filter(key => !isNaN(Number(key)))
        .map(key => Number(key) as enemyActions);
    
      const randomIndex = Math.floor(Math.random() * enumValues.length);
      return enumValues[randomIndex];
    }

  }