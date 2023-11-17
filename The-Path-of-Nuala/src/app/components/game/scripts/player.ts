import * as PIXI from 'pixi.js';
import { actionIcons, playerActions, playerSprites } from "src/app/enums/enums";
import { Character } from "src/app/interfaces/interfaces";
import { enemy } from './commonEnemy';
import { healthbar } from './healthbarLogic';
import { nameplateStyle } from './randomNameGenerator';

const hitSprite = '/assets/game-assets/action-icons/attack-hit.png'
export class player implements Character {
    charName: string;
    charClass: string;
    MAX_HP: number;
    hp: number;
    dmgMod: number;
    defenseMod: number;
    nextTurn: playerActions;
    nextTurnSprite: PIXI.Sprite;
    currentTurnSprite: PIXI.Sprite;
    currentStatusSprite: PIXI.Sprite;
    dmg: number;
    hittedIcon: PIXI.Sprite;
    namePlate: PIXI.Text;

    constructor(name: string, charClass: string) {
        this.charName = name;
        this.MAX_HP = 100;
        this.dmgMod = 1;
        this.charClass = charClass;
        this.defenseMod = 1;
        this.currentTurnSprite = PIXI.Sprite.from(playerSprites.PLACEHOLDER);
        this.currentTurnSprite.anchor.set(0.5)
        this.currentTurnSprite.x = 200;
        this.currentTurnSprite.y = 350;

        this.namePlate = new PIXI.Text(this.charName,nameplateStyle);
        this.namePlate.anchor.set(0.5);
        this.namePlate.y = this.currentTurnSprite.y - 150;
        this.namePlate.x = this.currentTurnSprite.x;

        this.currentStatusSprite = PIXI.Sprite.from(actionIcons.DEFEND)
        this.currentStatusSprite.anchor.set(0.5)
        this.currentStatusSprite.y = this.currentTurnSprite.y;
        this.currentStatusSprite.x = this.currentTurnSprite.x - 125;
        this.currentStatusSprite.visible = false

        this.hittedIcon = PIXI.Sprite.from(hitSprite)
        this.hittedIcon.anchor.set(0.5)
        this.hittedIcon.y = this.currentTurnSprite.y - 50;
        this.hittedIcon.x = this.currentTurnSprite.x;
        this.hittedIcon.alpha = 0;

        // Ajustar valores en función de la clase
        this.setPlayerClass(charClass);
    }

    private setPlayerClass(charClass: string) {
        switch (charClass.toLowerCase()) {
            case 'warrior':
                this.hp = this.MAX_HP + 20; // Ajusta la vida para el guerrero
                this.dmg = 15; // Ajusta el daño para el guerrero
                break;
            case 'mage':
                this.hp = this.MAX_HP - 10; // Ajusta la vida para el mago
                this.dmg = 20; // Ajusta el daño para el mago
                break;
            case 'rogue':
                this.hp = this.MAX_HP; // La vida predeterminada para el pícaro
                this.dmg = 12; // Ajusta el daño para el pícaro
                break;
            default:
                throw new Error('Clase de personaje no válida');
        }
    }


    get getCharName(){
        return this.charName
    }
    set setCharName(name: string){
        this.charName = name;
    }
    get getMaxHP(){
        return this.MAX_HP
    }
    set setMaxHp(hp: number){
        this.MAX_HP = hp;
    }
    get getHp(){
        return this.hp
    }
    set setHp(hp: number){
        this.hp = hp;
    }
    get getDmgMod(){
        return this.dmgMod
    }
    set setDmgMod(mod: number){
        this.dmgMod = mod;
    }
    get getDefenseMod(){
        return this.defenseMod
    }
    set setDefenseMod(mod: number){
        this.defenseMod = mod;
    }

    getHit(damage: number,playerhealthbar:healthbar){
        if(damage >= this.hp){
            this.hp = 0
            playerhealthbar.barHealth.width = 0;
            playerhealthbar.barHealth.visible=false;
        }else{
            this.hp -= damage;
            playerhealthbar.barHealth.width-=(1.65*damage);
            playerhealthbar.barHealth.x+=(1.65*damage)/8;
        }
    }

    action(enemy:enemy,playerhealthbar:healthbar){
        if(this.defenseMod > 1){
            this.defenseMod = 1
            this.currentStatusSprite.visible = false
          }
        
        switch(this.nextTurn){
            case playerActions.ATTACK:{
                enemy.getHit(this.dmgMod*this.dmg);
                this.currentStatusSprite.visible = false;
                console.log('playerAttack');
            }
            break
            case playerActions.GUARD:{
                this.defenseMod=1.1;
                this.currentStatusSprite.texture = PIXI.Texture.from(actionIcons.DEFEND)
                this.currentStatusSprite.visible = true;
                console.log('Player Defend');
            }
            break
            case playerActions.HEALTH_UP:{
                this.hp+=10;
                if(playerhealthbar.barHealth.width+(1.65*10)>=165){
                    playerhealthbar.barHealth.width=165;
                }else{
                    playerhealthbar.barHealth.width+=(1.65*10);
                    playerhealthbar.barHealth.x-=1.3;
                }    
                this.currentStatusSprite.visible = false;
                console.log("CURITA")
            }
            break
            
        }

        if(this.dmgMod != 1){
            this.dmgMod = 1
            this.currentStatusSprite.visible = false
          }

    }
    
}