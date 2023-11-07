import { Sprite, Text } from "pixi.js";
import { chartNumber } from "../enums/enums";

/**Interfaz Usuario */
export interface User{
    usuario: string,
    constraseña: string,
    avatar: string,
    partidas: Partida[],
    id?: number
}

/**Interfaz Partidas */
export interface Partida{
    fecha: Date,
    personaje: Personaje,
    puntaje: number,
    id?: number
}

/**Interfaz Personaje */
export interface Personaje{
    charName: string;
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
    hp: number,
    dmg: number,
    sprite: Sprite,
    namePlate: Text
}
