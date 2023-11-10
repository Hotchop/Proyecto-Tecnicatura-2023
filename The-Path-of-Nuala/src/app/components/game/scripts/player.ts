import { Character } from "src/app/interfaces/interfaces";

export class player implements Character{
    charName: string;
    MAX_HP: number;
    hp: number;
    dmgMod: number;
    defenseMod: number;

    constructor(name: string){
        this.charName = name;
        this.MAX_HP = 100;
        this.hp = this.MAX_HP;
        this.dmgMod = 1;
        this.defenseMod = 1;
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

    getHit(damage: number){
        this.hp -= damage;
        if(this.hp <= 0){
            console.log('DEAD');
        }
    }


}