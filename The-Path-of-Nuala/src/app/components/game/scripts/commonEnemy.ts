import * as PIXI from 'pixi.js';
import { Enemy} from 'src/app/interfaces/interfaces';
import { enemyActions, chartNumber, actionIcons } from 'src/app/enums/enums';
import { ChartopiaService } from 'src/app/services/chartopia.service';
import { getRandomName, nameplateStyle } from './randomNameGenerator';
import { player } from './player';

/**Common Enemy Constants */
const enemyDefaultName = 'Enemy'
const enemyDefaultSprite = '/assets/game-assets/enemy-ph.png'
const hitSprite = '/assets/game-assets/action-icons/attack-hit.png'

/**
 * Common enemy class. Sets name and nameplate using the getRandomName function
 */
export class enemy implements Enemy {
    name: string;
    MAX_HP: number;
    hp: number;
    dmg: number;
    sprite: PIXI.Sprite;
    dmgMod: number;
    defenseMod: number;
    namePlate: PIXI.Text;
    nextTurn: enemyActions;
    nextTurnSprite: PIXI.Sprite;
    currentStatusSprite: PIXI.Sprite;
    hittedIcon: PIXI.Sprite;

    constructor(MAX_HP: number, dmg: number,chartopia: ChartopiaService) {
      //Stats setup
      this.MAX_HP = MAX_HP
      this.hp = this.MAX_HP;
      this.dmg = dmg;
      this.dmgMod = 1;
      this.defenseMod = 1;
      this.nextTurn = enemyActions.ATTACK;
      
      //Sprite setup
      this.sprite = PIXI.Sprite.from(enemyDefaultSprite);
      this.sprite.anchor.set(0.5);
      this.sprite.x = 600;
      this.sprite.y = 300;
      this.sprite.scale.x *= -1;
      
      //PIXI text setup
      this.namePlate = new PIXI.Text('',nameplateStyle);
      this.namePlate.anchor.set(0.5);
      this.namePlate.y = this.sprite.y - 125;
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

      //Turn and Status
      this.nextTurnSprite = PIXI.Sprite.from(actionIcons.ATTACK)
      this.nextTurnSprite.anchor.set(0.5)
      this.nextTurnSprite.y = this.sprite.y - 200;
      this.nextTurnSprite.x = this.sprite.x;

      this.currentStatusSprite = PIXI.Sprite.from(actionIcons.DEFEND)
      this.currentStatusSprite.anchor.set(0.5)
      this.currentStatusSprite.y = this.sprite.y + 150;
      this.currentStatusSprite.x = this.sprite.x;
      this.currentStatusSprite.visible = false

      this.hittedIcon = PIXI.Sprite.from(hitSprite)
      this.hittedIcon.anchor.set(0.5)
      this.hittedIcon.y = this.sprite.y;
      this.hittedIcon.x = this.sprite.x;
      this.hittedIcon.alpha = 0;
    }

    enemyTurn(player: player){
      //Clear status. If it defended last turn, set back to normal
      if(this.defenseMod > 1){
        this.defenseMod = 1
        this.currentStatusSprite.visible = false
      }

      //Use action. If its a buffed attack, clear buff after.
      switch(this.nextTurn){
        case enemyActions.ATTACK: {
          player.getHit(this.dmg * this.dmgMod)
          this.dmgMod = 1;
          this.currentStatusSprite.visible = false
          console.log('Attack');
        }
        break
        case enemyActions.STRONG_ATTACK: {
          player.getHit(this.dmg * this.dmgMod * 0.25)
          this.dmgMod = 1;
          this.currentStatusSprite.visible = false
          console.log('Strong Attack');
        }
        break
        case enemyActions.DEFEND: {
          this.defenseMod = 1.1
          this.currentStatusSprite.texture = PIXI.Texture.from(actionIcons.DEFEND)
          this.currentStatusSprite.visible = true
          console.log('Defend');
        }
        break
        case enemyActions.STRONG_DEFEND: {
          this.defenseMod = 1.25
          this.currentStatusSprite.texture = PIXI.Texture.from(actionIcons.STRONG_DEFEND)
          this.currentStatusSprite.visible = true
          console.log('Strong Defend');
        }
        break
        case enemyActions.DEBUFF: {
          player.setDmgMod = 0.9
          console.log('Debuff');
        }
        break
        case enemyActions.STRONG_DEBUFF: {
          player.setDmgMod = 0.75
          console.log('Strong Debuff');
        }
        break
        case enemyActions.BUFF: {
          this.dmgMod = 1.25
          this.currentStatusSprite.texture = PIXI.Texture.from(actionIcons.BUFF)
          this.currentStatusSprite.visible = true;
          console.log('Buff');
        }
        break
        case enemyActions.STRONG_BUFF: {
          this.dmgMod = 1.5
          this.currentStatusSprite.texture = PIXI.Texture.from(actionIcons.STRONG_BUFF)
          this.currentStatusSprite.visible = true;
          console.log('Strong Buff');
        }
        break
        default: console.log("Did't choose an action!");
      }


      //Choose next action. If the last was a buff, the enext is an attack (75% Normal, 25% Strong)
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

      switch(this.nextTurn){
        case enemyActions.ATTACK: this.nextTurnSprite.texture = PIXI.Texture.from(actionIcons.ATTACK);
        break
        case enemyActions.STRONG_ATTACK:this.nextTurnSprite.texture = PIXI.Texture.from(actionIcons.STRONG_ATTACK);
        break
        case enemyActions.DEFEND:this.nextTurnSprite.texture = PIXI.Texture.from(actionIcons.DEFEND);
        break
        case enemyActions.STRONG_DEFEND:this.nextTurnSprite.texture = PIXI.Texture.from(actionIcons.STRONG_DEFEND);
        break
        case enemyActions.DEBUFF:this.nextTurnSprite.texture = PIXI.Texture.from(actionIcons.DEBUFF);
        break
        case enemyActions.STRONG_DEBUFF:this.nextTurnSprite.texture = PIXI.Texture.from(actionIcons.STRONG_DEBUFF);
        break
        case enemyActions.BUFF:this.nextTurnSprite.texture = PIXI.Texture.from(actionIcons.BUFF);
        break
        case enemyActions.STRONG_BUFF:this.nextTurnSprite.texture = PIXI.Texture.from(actionIcons.STRONG_BUFF);
        break
        default: console.log("Did't choose an action!");
      }
      
    }

    getHit(damage: number){
      this.hp -= damage * (2 - this.defenseMod) //At more defense, lower damage
      if(this.hp <= 0){
        console.log('DEAD');
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