import { Sprite, Text } from "pixi.js";
import { chartNumber } from "../enums/enums";

/**Interfaz Usuario */
export interface User{
    usuario: string,
    constraseña: string,
    avatar: string,
    partidas: Save[],
    id?: number
}

/**Interfaz Partidas */
export interface Save{
    fecha: Date,
    personaje: Character,
    puntaje: number,
    id?: number
}

/**Interfaz Personaje */
export interface Character{
    charName: string,
    MAX_HP: number,
    hp:number,
    dmgMod:number,
    defenseMod:number
    //Para completar con estadisticas para el juego
}

/**Interfaz de Objetos Chart de Chartopia API */
export interface Chart{
    chart_name: string,
    chart_url: string,
    results: [ string ]
  }

/**Interfaz Enemigo */
export interface Enemy{
    name: string,
    MAX_HP: number
    hp: number,
    dmg: number,
    dmgMod: number,
    defenseMod: number,
    sprite: Sprite,
    namePlate: Text
}
